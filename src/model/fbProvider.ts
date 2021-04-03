import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import { User } from "./user";

// https://firebase.google.com/docs/rules/basics

const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "smp-sstinc-org.firebaseapp.com",
  databaseURL: "",
  projectId: "smp-sstinc-org",
  storageBucket: "smp-sstinc-org.appspot.com",
  messagingSenderId: "1044616085398",
  appId: "1:1044616085398:web:bb1e2a3014c461597ba7b7",
  measurementId: "G-TW0Z3KRJ2D"
};

const firestores = {
  atd: "atd",
  url: "url",
}

class Auth {
  
  constructor() {
    /** Updates currentUser on login/logout */
    firebase.auth().onIdTokenChanged((user) => {
      this.currentUser = user === null ? null : new User(user)
    })
  }

  currentUser: User

  /** Helper method to allow external files such as for useState to be updated */
  addIdTokenChangedListener(callback: (user: User) => void) {
    firebase.auth().onIdTokenChanged((user) => callback(user === null ? null : new User(user)))
  }

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

}

class Atd {

  async checkIn(user: User) {
    const ts = firebase.firestore.Timestamp.fromDate(new Date())
    const jsDate = ts.toDate()
    return firebase.firestore().collection(firestores.atd).doc(`${jsDate.getDay()}-${jsDate.getMonth()+1}-${jsDate.getFullYear()}-${user.displayName}`).set({
      displayName: user.displayName,
      email: user.email,
      timestamp: ts,
    }).catch(e => {
      console.error("Atd: ", e)
    })
  }

}

class Url {

  async urlForSuffix(suffix: string): Promise<firebase.firestore.DocumentSnapshot> {
    return firebase.firestore().collection(firestores.url).doc(suffix).get().catch(e => {
      console.error("Url: ", e)
      return e
    })
  }

}

class FBProvider {

  /**
   * Constructor for Firebase backend singleton, FirebaseProvider, includes Auth and Firestore
   * Init firebase app API
   */
  constructor() {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    this.auth = new Auth()
    this.atd = new Atd()
    this.url = new Url()
  }
  
  // analytics = (): firebase.analytics.Analytics => firebase.analytics();

  auth: Auth
  atd: Atd
  url: Url

  static get instance(): FBProvider {
    return fbProvider
  }

}

export const fbProvider = new FBProvider()