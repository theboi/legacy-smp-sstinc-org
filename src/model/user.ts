import firebase from "firebase/app";
import { fbProvider } from "./fbProvider";

export enum UserRole {
  "Alien" = 0,
  "Banned" = 1,
  "Trainee" = 2,
  "Employee" = 3,
  "ExCo" = 7,
  "Head" = 8,
  "Root" = 9
}

export enum UserRank {
  "Simp" = 1
}

export class User {
  /** Call initialized after constructing User */
  async initialized(fbUser: firebase.User): Promise<User> {
    if (this != null) {
      this._fbUser = fbUser;
      this._fbData = (await fbProvider.auth.getUserData(fbUser?.email)).data()
    }

    return this
  }

  private _fbUser: firebase.User;
  private _fbData: firebase.firestore.DocumentData;

  get class(): number {
    return this._fbData?.class;
  }
  get iid(): string {
    return this._fbData?.iid;
  }
  // get name(): string {
  //   return this._fbData?.name;
  // }
  get role(): UserRole {
    return this._fbData?.role ?? UserRole.Alien;
  }

  get displayName(): string {
    return this._fbUser?.displayName;
  }
  get email(): string {
    return this._fbUser?.email;
  }
  get photoURL(): string {
    return this._fbUser?.photoURL;
  }
}
