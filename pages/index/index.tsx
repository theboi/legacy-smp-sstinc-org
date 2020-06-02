import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import style from "./style.module.css";

export default function App() {
  const [isLoggedin, setLogin] = useState(``);

  const postNewLink = () => {
    const data = {
      dynamicLinkInfo: {
        domainUriPrefix: "https://go.sstinc.org",
        link: linkField,
      },
      suffix: {
        customSuffix: "Hello",
        option: "OPTION_UNSPECIFIED",
      }
    };
    axios
      .post(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.GOOGLE_API_KEY}`,
        data
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error)
      })
  };

  let linkField: String;
  let suffixField: String;

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.GOOGLE_API_KEY,
      authDomain: "go-sstinc-org.firebaseapp.com",
      databaseURL: "https://go-sstinc-org.firebaseio.com",
      projectId: "go-sstinc-org",
      storageBucket: "go-sstinc-org.appspot.com",
      messagingSenderId: "383271500516",
      appId: "1:383271500516:web:dbf5a044580ef81b4e8af1",
      measurementId: "G-SPL13C4C16",
    };
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // let token = result.credential;
        }
        let user = result.user;
        console.log(user);
        setLogin(user.email);
      })
      .catch(function (error) {
        console.warn(`${error.message} (Ignore if you have yet to log in)`);
      });
  });

  return (
    <div className={style.main}>
      <Head>
        <title>SST Inc. URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src="/assets/sstinc-icon.png"
        alt="SST Inc Icon"
        width={100}
        height={100}
      />
      <div className={style.content}>
        <h3 className={style.header}>SST Inc URL Shortener</h3>
        <p className={style.desc}>
          Only for use by SST Inc. EXCO. Please sign in.
        </p>
        {isLoggedin ? (
          <div className={style.form}>
            <div className={style.inputFields}>
              <input
                type="text"
                placeholder="Suffix"
                onChange={(event) => {
                  suffixField = event.target.value;
                }}
              />
              <input
                type="text"
                placeholder="Link"
                onChange={(event) => {
                  linkField = event.target.value;
                }}
              />
            </div>
            <div className={style.button} onClick={postNewLink}>
              Add
            </div>
          </div>
        ) : (
          <div
            className={style.button}
            onClick={() => {
              var provider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithRedirect(provider);
            }}
          >
            Sign In With Google
          </div>
        )}
      </div>
      <p className={style.about}>
        Created by{" "}
        <a className={style.link} href="https://ryanthe.com">
          Ryan The
        </a>{" "}
        from SST Inc | 2020 | v1.0
      </p>
    </div>
  );
}
