import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default function SuffixPage() {
  const suffixQuery = useRouter().query.suffix;
  const [shareDesc, setShareDesc] = useState({
    title: ``,
    image: ``,
    desc: ``,
    url: ``,
  });

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

    let linkRef = firebase.firestore().collection("links");
    linkRef.get().then((col) => {
      col.docs.map((doc) => {
        if (doc.data().suffix === suffixQuery) {
          window.location.replace(doc.data().link);
        }
      });
    });
  });

  // fetch(`https://crossorigin.me/${url}`)
  //   .then((response) => response.text())
  //   .then((html) => {
  //     const doc = new DOMParser().parseFromString(html, "text/html");
  //     const title = doc.querySelectorAll("title")[0];
  //     return title.innerText;
  //   });

  return (
    <>
      <Head>
        <title>{shareDesc.title}</title>
        <meta property="og:title" content={shareDesc.title} />
        <meta property="og:image" content={shareDesc.image} />
        <meta property="og:description" content={shareDesc.desc} />
        <meta property="og:url" content={shareDesc.url} />
        <meta name="twitter:card" content={shareDesc.image} />
      </Head>
    </>
  );
}
