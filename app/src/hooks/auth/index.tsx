import { Page } from "@notionhq/client/build/src/api-types";
import firebase from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { firebaseConfig } from "../../model/provider";
import { User } from "../../typings/user";

require("firebase/auth");

export interface AuthContent {
  signIn: () => {};
  signUp: () => {};
  signOut: () => {};
  checkForAuth: () => {};
  getToken: () => {};
}

const AuthContext = createContext<AuthContent>(null);

export const AuthProvider = (props) => {
  const value = {
    signIn: props.signIn || signIn,
    signUp: props.signUp || signUp,
    signOut: props.signOut || signOut,
    checkForAuth: props.checkForAuth || checkForAuth,
    getToken: props.getToken || getToken,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [fbUser, setFbUser] = useState<firebase.User>();
  const { data: user, error } = useSWR<User, Error>(
    fbUser && "/api/v1/authuser/"
  );

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged((fbUser: firebase.User) => {
        setFbUser(fbUser);
      });

    return unsubscribe;
  }, []);

  return { auth: useContext(AuthContext), user, fbUser, error };
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

/** Call after signIn redirect */
async function checkForAuth(): Promise<void> {
  await firebase.auth().getRedirectResult();
}

async function getToken(): Promise<string> {
  return await firebase.auth().currentUser.getIdToken(true);
}
