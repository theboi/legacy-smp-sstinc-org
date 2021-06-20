import firebase from "firebase/app";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { getSWRFetcher } from "../../pages/_app";
import { User } from "../../typings/user";

require("firebase/auth");

export interface AuthContent {
  signIn: () => {};
  signUp: () => {};
  signOut: () => {};
  initializeApp: () => Promise<void>;
  getToken: () => Promise<string>;
  user: User;
  fbUser: firebase.User;
}

export const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "smp-sstinc-org.firebaseapp.com",
  databaseURL: "",
  projectId: "smp-sstinc-org",
  storageBucket: "smp-sstinc-org.appspot.com",
  messagingSenderId: "1044616085398",
  appId: "1:1044616085398:web:bb1e2a3014c461597ba7b7",
  measurementId: "G-TW0Z3KRJ2D",
};

const AuthContext = createContext<AuthContent>(null);

export const AuthProvider = (props) => {
  const [fbUser, setFbUser] = useState<firebase.User>();
  const { data: user } = useSWR<User, Error>(
    fbUser && "/api/v1/authuser/",
    getSWRFetcher(getToken)
  );

  const value = {
    signIn: props.signIn || signIn,
    signUp: props.signUp || signUp,
    signOut: props.signOut || signOut,
    initializeApp: props.initializeApp || initializeApp,
    getToken: props.getToken || getToken,
    user,
    fbUser,
  };

  function signUp(email) {}

  /** Call method when sign in, remember to call initializeApp when loading page from redirect. */
  async function signIn(): Promise<void> {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        firebase
          .auth()
          .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      )
      .catch((e) => {
        console.error(`${e.message} (signInWithRedirect)`);
      });
  }

  async function signOut(): Promise<void> {
    await firebase.auth().signOut();
  }

  /**
   * Call once during app start-up
   */
  async function initializeApp(): Promise<void> {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    await firebase.auth().getRedirectResult();
    firebase.auth().onIdTokenChanged((fbUser: firebase.User) => {
      setFbUser(fbUser);
    });
    setFbUser(firebase.auth().currentUser);
  }

  function getToken(): Promise<string> {
    return firebase.auth().currentUser.getIdToken(true);
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
