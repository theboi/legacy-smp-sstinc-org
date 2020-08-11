import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import style from "./style.module.css";

export default function SuffixPage() {
  const suffixQuery = useRouter().query.suffix;

  useEffect(() => {
    window.location.href = `/api/${suffixQuery}`
  })
  // const [shareDesc, setShareDesc] = useState({
  //   title: ``,
  //   image: ``,
  //   desc: ``,
  //   url: ``,
  // });
  // const [hasFailed, setFail] = useState(false)

  // useEffect(() => {
  //   const firebaseConfig = {
  //     apiKey: process.env.GOOGLE_API_KEY,
  //     authDomain: "go-sstinc-org.firebaseapp.com",
  //     databaseURL: "https://go-sstinc-org.firebaseio.com",
  //     projectId: "go-sstinc-org",
  //     storageBucket: "go-sstinc-org.appspot.com",
  //     messagingSenderId: "383271500516",
  //     appId: "1:383271500516:web:dbf5a044580ef81b4e8af1",
  //     measurementId: "G-SPL13C4C16",
  //   };
  //   if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

  //   firebase.firestore().collection("links").get().then((col) => {
  //     col.docs.map((doc) => {
  //       if (doc.data().suffix === suffixQuery) {
  //         window.location.replace(doc.data().link);
  //       }
  //     });
  //   }).then(() => {
  //     setTimeout(() => {
  //       console.error("404 - Page Not Found (Site did not respond within 2 seconds")
  //       setFail(true)
  //     }, 2000)
  //   })
  // });

  // // fetch(`https://crossorigin.me/${url}`)
  // //   .then((response) => response.text())
  // //   .then((html) => {
  // //     const doc = new DOMParser().parseFromString(html, "text/html");
  // //     const title = doc.querySelectorAll("title")[0];
  // //     return title.innerText;
  // //   });

  // return (
  //   <>
  //     <Head>
  //       <title>{shareDesc.title}</title>
  //       <meta property="og:title" content={shareDesc.title} />
  //       <meta property="og:image" content={shareDesc.image} />
  //       <meta property="og:description" content={shareDesc.desc} />
  //       <meta property="og:url" content={shareDesc.url} />
  //       <meta name="twitter:card" content={shareDesc.image} />
  //     </Head>
  //     {hasFailed ? (
  //       <div className={style.main}>
  //       <a href="https://sstinc.org" rel="noreferrer noopener">
  //         <img
  //           src="/assets/sstinc-icon.png"
  //           alt="SST Inc Icon"
  //           width={100}
  //           height={100}
  //         />
  //       </a>
  //       <div className={style.contentDiv}>
  //         <h1 className={style.errorCode}>404</h1>
  //         <h3>Page Not Found</h3>
  //       </div>
  //     </div>
  //     ) : <></>}
  //   </>
  // );

  return <></>;
}
