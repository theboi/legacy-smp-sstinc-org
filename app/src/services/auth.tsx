import { Page } from "@notionhq/client/build/src/api-types";
import firebase from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { firebaseConfig } from "../model/provider";
import { User } from "../objects/user";
import axios from "axios";

require("firebase/auth");

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const value = {
    signIn: props.signIn || signIn,
    signUp: props.signUp || signUp,
    signOut: props.signOut || signOut,
    checkForAuth: props.checkForAuth || checkForAuth,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string>();

  const { data, error } = useSWR<Page, Error>(`/api/v1/user/${email}`);

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged((fbUser: firebase.User) => {
        setEmail(fbUser?.email);
        setUser(fbUser === null ? null : new User(fbUser, data));
      });

    return unsubscribe;
  }, [data]);

  return { auth: useContext(AuthContext), user: user, error: error };
};

function signUp(email) {}

/** Call method when sign in, remember to call checkForAuth when loading page from redirect. */
async function signIn(): Promise<void> {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() =>
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    )
    .catch((e) => {
      console.error(`${e.message} (signInWithRedirect)`);
    });
}

/** Call after signIn redirect */
async function checkForAuth(): Promise<void> {
  await firebase
    .auth()
    .getRedirectResult()
    .catch((e) => {
      console.warn(`${e.message} (getRedirectResult)`);
    });
}

/**
 * Signs out of Google account
 * @returns Whether signOut successful
 */
async function signOut(): Promise<boolean> {
  return firebase
    .auth()
    .signOut()
    .then(() => true)
    .catch(() => false);
}
