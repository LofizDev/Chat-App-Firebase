import React from 'react';
import ChatApp from './src/ChatApp';

import {initializeApp} from 'firebase/app';
const firebaseConfig = {
  apiKey: xxxxxxxxxxxxxxxxxxxxxxxxxxx,
  authDomain:xxxxxxxxxxxxxxxxxxxxxxxxxx,
  databaseURL:xxxxxxxxxxxxxxxxxxxxxxxxxx,
  projectId: xxxxxxxxxxxxxxxxxxxxxxxxxxxxx,
  storageBucket: xxxxxxxxxxxxxxxxxxxxxxxxx,
  messagingSenderId: xxxxxxxxxxxxxxxxxxx,
  appId: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {

  return (
    <ChatApp />
)
};
export default App;
