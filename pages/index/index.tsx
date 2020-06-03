import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import style from "./style.module.css";

let deepLinkField: string;
let nameField: string;
let suffixField: string;

export default function App() {
  const [screen, setScreen] = useState(`login`); // login, admin, success

  const authAdmins = [
    // as of 3 June 2020, SST Inc EXCO 2020, 2019, BOD
    "koh_jie_ming_xavier@s2019.ssts.edu.sg",
    "ryan_theodore_the@s2019.ssts.edu.sg",
    "leong_yu_xuan_thaddeus@s2019.ssts.edu.sg",
    "oshua_lim_zhe_kai@s2019.ssts.edu.sg",
    "joe_wong@s2019.ssts.edu.sg",
    "granwyn_tan@s2019.ssts.edu.sg",
    "jayachandran_tanish@s2019.ssts.edu.sg",
    "chia_howie@s2019.ssts.edu.sg",
    "darius_koh_kai_keat@s2019.ssts.edu.sg",
    "chew_ming_hong_ethan@s2019.ssts.edu.sg",
    "karl_orjalo@s2018.ssts.edu.sg",
    "sebastian_choo_yong_qiang@s2017.sst.edu.sg",
    "santhiyaa_senthilkumar@s2018.ssts.edu.sg",
    "kesler_kok_weng_fong@s2018.ssts.edu.sg",
    "yeo_yi_axios@s2017.sst.edu.sg",
    "arash_nur_iman_b_m_a_s@s2018.ssts.edu.sg",
    "jonathan_tan_jiayi@s2018.ssts.edu.sg",
    "yee_jia_chen@s2017.sst.edu.sg",
    "qin_guan@s2017.sst.edu.sg",
    "koh_kai_sern@s2018.ssts.edu.sg",
    "carl_ian_voller@s2017.sst.edu.sg",
    "shannen_samuel_rajoo@s2017.sst.edu.sg",
    "aurelius_yeo@sst.edu.sg",
    "jonathan_chua@sst.edu.sg",
    "jovita_tang@sst.edu.sg",
    "pang_hee_tee_robin@sst.edu.sg",
  ];

  let loadingOverlay = useRef(null);

  useEffect(() => {
    console.log("Loading login...");
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
        loadingOverlay.current.style.display = "none";

        console.log(firebase.auth().currentUser);

        if (authAdmins.includes(firebase.auth().currentUser?.email ?? "")) {
          setScreen(`admin`);
        }

        if (authAdmins.includes(result.user.email)) {
          setScreen(`admin`);
        } else {
          console.error(
            "Permission denied. Only for Inc EXCO and BOD. Please use your school account to log in."
          );
        }
      })
      .catch(function (error) {
        console.warn(`${error.message} (getRedirectResult)`);
      });
  });

  return (
    <div className={style.main}>
      <Head>
        <title>SST Inc. URL Shortener</title>
      </Head>
      <img
        src="/assets/sstinc-icon.png"
        alt="SST Inc Icon"
        width={100}
        height={100}
      />
      <div className={style.contentDiv}>
        {(() => {
          switch (screen) {
            case `login`:
              return (
                <div className={style.content}>
                  <h3>go.sstinc.org admin console</h3>
                  <p>
                    Only for use by SST Inc Executive Commitee (EXCO) and Board
                    Of Directors (BOD).
                  </p>
                  <p>Please use your SST Google Account to sign in.</p>
                  <button
                    className={style.activeButton}
                    onClick={() => {
                      var provider = new firebase.auth.GoogleAuthProvider();
                      firebase
                        .auth()
                        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                        .then(() => {
                          return firebase.auth().signInWithRedirect(provider);
                        })
                        .catch(function (error) {
                          console.error(
                            `${error.message} (signInWithRedirect)`
                          );
                        });
                    }}
                  >
                    Sign In With Google
                  </button>
                  <div className={style.loadingOverlay} ref={loadingOverlay}>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                      display="block"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="#00a4ff"
                        strokeWidth="10"
                        r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138"
                        transform="rotate(287.844 50 50)"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          repeatCount="indefinite"
                          dur="1s"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                        />
                      </circle>
                    </svg>
                  </div>
                </div>
              );
            case `admin`:
              return (
                <div className={style.content}>
                  <p
                    className={style.logoutButton}
                    onClick={() => {
                      firebase.auth().signOut();
                      setScreen(`login`);
                    }}
                  >
                    Sign Out
                  </p>
                  <h3>Create a new Link</h3>
                  <div className={style.newFieldDiv}>
                    <label htmlFor="suffix">NAME</label>
                    <input
                      type="text"
                      placeholder="SST Inc Website"
                      onChange={(event) => {
                        nameField = event.target.value;
                      }}
                    />
                    <label htmlFor="suffix">LONG URL</label>
                    <input
                      type="text"
                      placeholder="https://sstinc.org"
                      onChange={(event) => {
                        deepLinkField = event.target.value;
                      }}
                    />
                    <label htmlFor="suffix">SHORT URL</label>
                    <div className={style.shortUrlDiv}>
                      <p>go.sstinc.org/</p>
                      <input
                        id="suffix"
                        type="text"
                        placeholder="ABCD"
                        onChange={(event) => {
                          suffixField = event.target.value;
                        }}
                      />
                    </div>
                  </div>
                  <button
                    className={style.activeButton}
                    onClick={() => {
                      if (
                        authAdmins.includes(firebase.auth().currentUser.email)
                      ) {
                        firebase
                          .firestore()
                          .collection(`links`)
                          .add({
                            link: deepLinkField ?? "hello polis",
                            suffix: suffixField ?? "this is illegal you didnt add anyth",
                            date: firebase.firestore.Timestamp.fromDate(
                              new Date()
                            ),
                          })
                          .then((docRef) => {
                            console.log(
                              `Successful document written with ID: ${docRef.id}`
                            );
                            setScreen(`success`);
                          })
                          .catch((error) => {
                            // updateDebugMessage(`Error: ${error}`);
                            console.error(`Error adding document: ${error}`);
                          });
                      }
                    }}
                  >
                    Create new Link
                  </button>
                  <div className={style.statusOverlay}></div>
                </div>
              );
            case `success`:
              console.log(suffixField);
              return (
                <div className={style.content}>
                  <h3>Link created!</h3>
                  <p>Here's your new shortened link:</p>
                  <div className={style.linkArea}>
                    <p>
                      {window.location.href}
                      <span className={style.suffixBold}>{suffixField}</span>
                    </p>
                  </div>
                  <p>Copy this link and share it!</p>
                  <p>
                    You may remove links by requesting at
                    ryan.theodore.2006@gmail.com (Ryan The - SST Inc 2020)
                  </p>
                  <button
                    className={style.activeButton}
                    onClick={() => {
                      setScreen(`admin`);
                    }}
                  >
                    Great! Another one!
                  </button>
                </div>
              );
          }
        })()}
      </div>
      <p className={style.about}>
        Created by{" "}
        <a className={style.link} href="https://ryanthe.com">
          Ryan The
        </a>{" "}
        from SST Inc | 2020 | v2.0
      </p>
    </div>
  );
}

// <div className={style.content}>
//         <h3 className={style.header}>SST Inc URL Shortener Admin Console</h3>
//         <p className={style.desc}>
//           {isLoggedin ? "" : "Only for use by SST Inc. EXCO. Please sign in."}
//         </p>
//         {isLoggedin ? (
//           <div className={style.form}>

//             <div
//               className={style.button}
// onClick={}
//             >
//               Add
//             </div>
//           </div>
//         ) : (
//           <div
//             className={style.button}
// onClick={() => {
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithRedirect(provider);
// }}
//           >
//             Sign In With Google
//           </div>
//         )}
//       </div>
