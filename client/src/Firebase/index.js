/* eslint-disable linebreak-style */
import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/messaging';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBmv0D-o-SGUHUWmOExKI1G7bXy5Ni_RKo',
  authDomain: 'kree-f088f.firebaseapp.com',
  databaseURL: 'https://kree-f088f.firebaseio.com',
  projectId: 'kree-f088f',
  storageBucket: 'kree-f088f.appspot.com',
  messagingSenderId: '646102608832',
  appId: '1:646102608832:web:82cae72afd6cb524c5f625',
  measurementId: 'G-0MWN2P0D16'
  // apiKey: 'AIzaSyBSEx2-ykPTb70keLZh3LAuDtQT2VyCsco',
  // authDomain: 'evencloud-26d32.firebaseapp.com',
  // databaseURL: 'https://evencloud-26d32.firebaseio.com',
  // projectId: 'evencloud-26d32',
  // storageBucket: 'evencloud-26d32.appspot.com',
  // messagingSenderId: '599725599274',
  // appId: '1:599725599274:web:8f9a716ca577fc72a1f153',
  // measurementId: 'G-VSJNQ5LYK5'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, database, storage, provider, firebase as default };
