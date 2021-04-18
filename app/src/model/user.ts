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
      this.#fbUser = fbUser;
      this.#fbData = (await fbProvider.auth.userData(fbUser?.email)).data()
    }

    return this
  }

  #fbUser: firebase.User;
  #fbData: firebase.firestore.DocumentData;

  get class(): number {
    return this.#fbData?.class;
  }
  get iid(): string {
    return this.#fbData?.iid;
  }
  // get name(): string {
  //   return this.#fbData?.name;
  // }
  get buff(): number {
    return this.#fbData?.buff ?? 0
  }
  get role(): UserRole {
    return this.#fbData?.role ?? UserRole.Alien;
  }
  get displayName(): string {
    return this.#fbUser?.displayName;
  }
  get email(): string {
    return this.#fbUser?.email;
  }
  get photoURL(): string {
    return this.#fbUser?.photoURL;
  }
}
