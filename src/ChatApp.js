import React, {useState} from 'react';
import Chat from './Chat';
import Login from './Login';
import Users from './Users';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';
import { View } from 'react-native';

export default function ChatApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState(null);

  const onLogin = async () => {
    try {
      const database = getDatabase();
      // Kiểm tra nếu user đã đăng kí trc đó

      const user = await findUser(username);

      //  nếu user chưa đăng kí thi tạo mới
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          username: username,
          // Random ảnh user (avatar) khi nào mới 1 user 
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
        };

        set(ref(database, `users/${username}`), newUserObj);
        setMyData(newUserObj);
      }

      // Thiết lập bạn bè 
      const myUserRef = ref(database, `users/${username}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        setUsers(data.friends);
        setMyData(prevData => ({
          ...prevData,
          friends: data.friends,
        }));
      });
      setCurrentPage('users');
    } catch (error) {
      console.error(error);
    }
  };

  const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    return mySnapshot.val();
  };

  const onClickUser = user => {
    setCurrentPage('chat');
    setSelectedUser(user);
  };

  const onAddFriend = async name => {
    try {
      // Tìm kiếm user và thêm vào danh sách bạn 
      const database = getDatabase();

      const user = await findUser(name);

      if (user) {
        if (user.username === myData.username) {
          // Kiểm tra nếu user đó giống với chủ acc thì sẽ ko add bạn
          return;
        }

        if (
          myData.friends &&
          myData.friends.findIndex(f => f.username === user.username) > 0
        ) {
          // Ko add bạn 2 lần
          return;
        }

        // Tạo 1 phòng chat 

        const newChatroomRef = push(ref(database, 'chatrooms'), {
          firstUser: myData.username,
          secondUser: user.username,
          messages: [],
        });

        const newChatroomId = newChatroomRef.key;

        const userFriends = user.friends || [];

        update(ref(database, `users/${user.username}`), {
          friends: [
            ...userFriends,
            {
              username: myData.username,
              avatar: myData.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });

        const myFriends = myData.friends || [];
        //Thêm user vào danh sách bạn bè (sẽ show khi login)
        update(ref(database, `users/${myData.username}`), {
          friends: [
            ...myFriends,
            {
              username: user.username,
              avatar: user.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onBack = () => {
    setCurrentPage('users');
  };

  switch (currentPage) {
    case 'login':
      return (
        <Login
          onLogin={onLogin}
          username={username}
          setUsername={setUsername}
        />
      );
    case 'users':
      return (
        <Users
          users={users}
          onClickUser={onClickUser}
          userToAdd={userToAdd}
          setUserToAdd={setUserToAdd}
          onAddFriend={onAddFriend}
        />
      );
    case 'chat':
      return (
        <Chat myData={myData} selectedUser={selectedUser} onBack={onBack} />
      );
    default:
      return null;
  }
}