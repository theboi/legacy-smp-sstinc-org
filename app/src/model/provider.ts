import firebase from "firebase/app";

import { Atd } from "./atd";
import { Url } from "./url";

// https://firebase.google.com/docs/rules/basics

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

class Provider {
  /**
   * Constructor for Firebase backend singleton, FirebaseProvider, includes Auth and Firestore
   * Init firebase app API
   */
  constructor() {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    this.atd = new Atd();
    this.url = new Url();
  }

  // analytics = (): firebase.analytics.Analytics => firebase.analytics();

  atd: Atd;

  url: Url;

  static get instance(): Provider {
    return provider;
  }
}

export const provider = new Provider();
