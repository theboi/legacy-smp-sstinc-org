import firebase from "firebase/app";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import {
  PostSignUpAPIBody,
  PostSignUpAPIResponse,
} from "../../pages/api/v1/signup";
import { useSWRConfig } from "../../pages/_app";
import { User } from "../../typings/user";
import { get, post } from "../../utils/api/httpMethods";
import { useHost } from "../host";

require("firebase/auth");

export interface AuthContent {
  signIn: () => Promise<void>;
  signUp: (handle?: string) => Promise<void>;
  signOut: () => Promise<void>;
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
  const host = useHost();
  const swrConfig = useSWRConfig(getToken);
  const [fbUser, setFbUser] = useState<firebase.User>();
  const { data: user } = useSWR<User>(
    fbUser && "/api/v1/authuser/",
    async (url: string) => {
      await initializeApp();
      const res = await get(
        url,
        url.includes("/api/v1") ? await getToken() : undefined
      );
      if (!(res.status >= 200 && res.status <= 299)) {
        throw Error("A network error occurred");
      }
      return res.data;
    },
    swrConfig
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

  async function signUp(handle: string = undefined) {
    const res = await post<PostSignUpAPIResponse, PostSignUpAPIBody>(
      `http://${host}/api/v1/signup`,
      await getToken(),
      {
        handle: handle ?? firebase.auth().currentUser.email.split("@")[0],
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        firebase: firebase.auth().currentUser.uid,
        photoURL: firebase.auth().currentUser.photoURL,
      }
    );
  }

  async function signIn(): Promise<firebase.auth.UserCredential> {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      );
  }

  async function signOut(): Promise<void> {
    await firebase.auth().signOut();
  }

  /**
   * Call once during app start-up
   */
  async function initializeApp(): Promise<void> {
    if (!!firebase.apps.length) return;
    firebase.initializeApp(firebaseConfig);
    let promise = new Promise<void>((resolve) => {
      firebase.auth().onIdTokenChanged((fbUser: firebase.User) => {
        setFbUser(fbUser ?? undefined);
        resolve();
      });
    });
    return promise;
    // setFbUser(firebase.auth().currentUser);
  }

  function getToken(): Promise<string> {
    return firebase.auth().currentUser.getIdToken(true);
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
