import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User } from "./user";

const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "go-sstinc-org.firebaseapp.com",
  databaseURL: "https://go-sstinc-org.firebaseio.com",
  projectId: "go-sstinc-org",
  storageBucket: "go-sstinc-org.appspot.com",
  messagingSenderId: "383271500516",
  appId: "1:383271500516:web:dbf5a044580ef81b4e8af1",
  measurementId: "G-SPL13C4C16",
};

class FBProvider {

  /**
   * Constructor for Firebase backend singleton, FirebaseProvider, includes Auth and Firestore
   * Init firebase app API
   */
  constructor() {
    console.log("Init Auth");
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    /** Updates currentUser on login/logout */
    firebase.auth().onIdTokenChanged((user) => {
      this.currentUser = user === null ? null : new User(user)
    })
  }

  /** Helper method to allow external files such as for useState to be updated */
  addIdTokenChangedListener(callback: (user: User) => void) {
    firebase.auth().onIdTokenChanged((user) => callback(user === null ? null : new User(user)))
  }

  currentUser: User

  /** Call method when sign in, remember to call checkForAuth when loading page from redirect. */
  async signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithRedirect(provider);
      })
      .catch(function (error) {
        console.error(`${error.message} (signInWithRedirect)`);
      });
  }
  
  async checkForAuth() {    
    await firebase
      .auth()
      .getRedirectResult()
      .catch(function (error) {
        console.warn(`${error.message} (getRedirectResult)`);
      });
  }
  
  async signOut() {
    await firebase.auth().signOut()
  }

  static get instance(): FBProvider {
    return fbProvider
  }
}

export const fbProvider = new FBProvider()