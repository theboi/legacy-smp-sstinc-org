import firebase from "firebase/app";
import { firebaseConfig } from "../model/provider";
import { User } from "../services/userold";

require("firebase/auth");
require("firebase/firestore");

class AuthProvider {
  constructor() {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    /** Updates currentUser on login/logout */
    firebase.auth().onIdTokenChanged(async (fbUser) => {
      const user = await new User().initialized(fbUser);
      this.currentUser = fbUser === null ? null : user;
    });
  }

  currentUser: User;

  /** Helper method to allow external files such as for useState to be updated */
  static addIdTokenChangedListener(callback: (user: User) => void): void {
    firebase.auth().onIdTokenChanged(async (fbUser) => {
      const user = await new User().initialized(fbUser);
      callback(fbUser === null ? null : user);
    });
  }

  /** Call method when sign in, remember to call checkForAuth when loading page from redirect. */
  static async signIn(): Promise<void> {
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

  static async checkForAuth(): Promise<void> {
    await firebase
      .auth()
      .getRedirectResult()
      .catch((e) => {
        console.warn(`${e.message} (getRedirectResult)`);
      });
  }

  static async signOut(): Promise<boolean> {
    return firebase
      .auth()
      .signOut()
      .then(() => true)
      .catch(() => false);
  }

  static async getUser(
    email: string
  ): Promise<
    firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  > {
    return firebase.firestore().collection("users").doc(email).get();
  }

  static async getPrivacyPolicy(): Promise<string> {
    return "hello";
  }
}

const authProvider = new AuthProvider();

export { AuthProvider, authProvider };
