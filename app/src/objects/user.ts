import {
  EmailPropertyValue,
  NumberPropertyValue,
  Page,
  RichText,
  RichTextPropertyValue,
  SelectPropertyValue,
} from "@notionhq/client/build/src/api-types";
import firebase from "firebase/app";

export enum UserRole {
  "Banned" = 0,
  "Member" = 1,
  "Trainee" = 2,
  "Employee" = 3,
  "Associate" = 4,
  "Alumni" = 5,
  "ExCo" = 6,
  "Consultant" = 7,
  "BOD" = 8,
  "Root" = 9,
}

export enum UserRank {
  "Simp" = 1,
}

export class User {
  #rawUser: firebase.User;

  #rawData: Page;

  get iid(): string {
    return (this.#rawData?.properties?.["Inc ID"] as RichTextPropertyValue)
      ?.rich_text[0].plain_text;
  }

  get name(): string {
    return (this.#rawData?.properties?.["Name"] as RichTextPropertyValue)
      ?.rich_text[0].plain_text;
  }

  get handle(): string {
    return (this.#rawData?.properties?.["Handle"] as RichTextPropertyValue)
      ?.rich_text[0].plain_text;
  }

  get email(): string {
    return (this.#rawData?.properties?.["Email"] as EmailPropertyValue)?.email;
  }

  get batch(): number {
    return (this.#rawData?.properties?.["Batch"] as NumberPropertyValue)
      ?.number;
  }

  get role(): UserRole {
    return UserRole[
      (this.#rawData?.properties?.["Role"] as SelectPropertyValue)?.select.name
    ];
  }

  get rank(): UserRole {
    return UserRole[
      (this.#rawData?.properties?.["Rank"] as SelectPropertyValue)?.select.name
    ];
  }

  get points(): number {
    return (this.#rawData?.properties?.["Points"] as NumberPropertyValue)
      ?.number;
  }

  get photoURL(): string {
    return this.#rawUser?.photoURL;
  }

  constructor(rawUser?: firebase.User, rawData?: Page) {
    this.#rawUser = rawUser;
    this.#rawData = rawData;
  }
}
