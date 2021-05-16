import firebase from "firebase/app";
import { User } from "./user";

require("firebase/auth");
require("firebase/firestore");

export class Auth {
  readonly firestore = "users";

  constructor() {
    /** Updates currentUser on login/logout */
    firebase.auth().onIdTokenChanged(async (fbUser) => {
      const user = await new User().initialized(fbUser);
      this.currentUser = fbUser === null ? null : user;
    });
  }

  currentUser: User;

  /** Helper method to allow external files such as for useState to be updated */
  addIdTokenChangedListener(callback: (user: User) => void): void {
    firebase.auth().onIdTokenChanged(async (fbUser) => {
      const user = await new User().initialized(fbUser);
      callback(fbUser === null ? null : user);
    });
  }

  /** Call method when sign in, remember to call checkForAuth when loading page from redirect. */
  async signIn(): Promise<void> {
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

  async checkForAuth(): Promise<void> {
    await firebase
      .auth()
      .getRedirectResult()
      .catch((e) => {
        console.warn(`${e.message} (getRedirectResult)`);
      });
  }

  async signOut(): Promise<boolean> {
    return firebase
      .auth()
      .signOut()
      .then(() => true)
      .catch(() => false);
  }

  async getUser(
    email: string
  ): Promise<
    firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  > {
    return firebase.firestore().collection(this.firestore).doc(email).get();
  }
}
