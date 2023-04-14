import { boot } from 'quasar/wrappers'
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const fbApp = firebase.initializeApp(firebaseConfig)
const fbAuth = getAuth();
const fbUiConfig = {
  signInSuccessUrl: '/#/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
};
const fbUi = new firebaseui.auth.AuthUI(fbAuth);
const fbDb = getFirestore();
const baseUserState = {
  displayName: null,
  email: null,
  metadata: {}
}
export default boot(({app, store}) => {
  onAuthStateChanged(fbAuth, (user) => {
    if (user) {
      //const userData: StoreUserInterface = {email: user.email, displayName: user.displayName, metadata: user.metadata, uid: user.uid}
      //store.commit('BaseStoreModule/setUser', userData)
      //store.commit('BaseStoreModule/setUserLoggedIn', true)
      //void store.dispatch('BaseStoreModule/login', userData)
    } else {
      //store.commit('BaseStoreModule/resetState', false)
      //store.commit('BaseStoreModule/setUser', baseUserState)
    }
  });
app.config.globalProperties.$firebase = fbApp;
})

export {fbApp, fbUi, fbUiConfig, fbAuth, fbDb};

