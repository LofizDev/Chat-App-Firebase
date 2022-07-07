import React from 'react';
import {Button, ImageBackground, StyleSheet, TextInput, View} from 'react-native';

export default function Login({onLogin, username, setUsername}) {

  return (
    //  Ảnh nền Trang login
      <ImageBackground source={{uri: 'https://images.pexels.com/photos/12640006/pexels-photo-12640006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
          style={{ flex: 1,
            width: null,
            height: null,
            }}>
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        />
      <Button title={'Đăng nhập'} onPress={onLogin} />
    </View>
        </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    // flex: 1,
    justifyContent: 'center',
    justifyContent:'center',
    position:'absolute',
    top:"45%",
    width:'100%',
    alignItems: 'center',
    
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});