import React, { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import { FaClipboard, FaExclamationCircle } from "react-icons/fa";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import style from "./style.module.css";

let deepLinkField = "";
let nameField = "";
let suffixField = "";

let createdSuffix = "ERROR";

export default function App() {
  const [screen, setScreen] = useState(`login`); // login, admin, success
  const [adminErrorMsg, setAdminErrorMsg] = useState(``);

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

  let loadingOverlayRef = useRef(null);
  let copiedPopupRef: HTMLDivElement;
  let deepLinkFieldRef = useRef(null);
  let suffixFieldRef = useRef(null);
  let createLinkButtonRef = useRef(null);

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
        loadingOverlayRef.current.style.display = "none";

        if (authAdmins.includes(firebase.auth().currentUser?.email ?? "")) {
          nameField = suffixField = deepLinkField = "";
          setScreen(`admin`);
        }

        if (authAdmins.includes(result.user.email)) {
          nameField = suffixField = deepLinkField = "";
          setScreen(`admin`);
        } else {
          console.error(
            "Permission denied. Only for Inc EXCO and BOD. Please use your school account to log in. You have been signed out."
          );
          firebase.auth().signOut();
        }
      })
      .catch(function (error) {
        console.warn(`${error.message} (getRedirectResult)`);
      });

    if (screen === `success`) {
      navigator.clipboard.writeText(
        `${window.location.href}${createdSuffix ?? "ERROR"}`
      );
      copiedPopupRef.className = `${style.copiedPopup} ${style.show}`;
      setTimeout(() => {
        if (copiedPopupRef !== null) {
          copiedPopupRef.className = `${style.copiedPopup}`;
        }
      }, 5000);
    }
  });

  return (
    <div className={style.main}>
      <Head>
        <title>SST Inc URL Shortener</title>
        <meta property="og:title" content="SST Inc URL Shortener" />
        <meta property="og:image" content="/assets/sstinc-icon.png" />
        <meta property="og:description" content="SST Inc URL Shortener Admin Console" />
        <meta property="og:url" content="go.sstinc.org" />
        <meta name="twitter:card" content="/assets/sstinc-icon.png" />
      </Head>
      <a href="https://sstinc.org" rel="noreferrer noopener" target="_blank">
        <img
          src="/assets/sstinc-icon.png"
          alt="SST Inc Icon"
          width={100}
          height={100}
        />
      </a>
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
                  <div className={style.loadingOverlay} ref={loadingOverlayRef}>
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
                    <label htmlFor="shortenerName">NAME*</label>
                    <input
                      id="shortenerName"
                      type="text"
                      placeholder="SST Inc Website"
                      onChange={(event) => {
                        nameField = event.target.value;
                      }}
                      onKeyUp={(event) => {
                        if (event.keyCode === 13) {
                          event.preventDefault();
                          deepLinkFieldRef.current.focus();
                        }
                      }}
                    />
                    <label htmlFor="shortenerLink">LONG URL*</label>
                    <input
                      ref={deepLinkFieldRef}
                      id="shortenerLink"
                      type="text"
                      placeholder="https://sstinc.org"
                      onChange={(event) => {
                        deepLinkField = event.target.value;
                      }}
                      onKeyUp={(event) => {
                        if (event.keyCode === 13) {
                          event.preventDefault();
                          suffixFieldRef.current.focus();
                        }
                      }}
                    />
                    <label htmlFor="shortenerSuffix">SHORT URL</label>
                    <div className={style.shortUrlDiv}>
                      <p className={style.domain}>go.sstinc.org/</p>
                      <input
                        ref={suffixFieldRef}
                        id="shortenerSuffix"
                        type="text"
                        placeholder="sstinc"
                        onChange={(event) => {
                          suffixField = event.target.value;
                        }}
                        onKeyUp={(event) => {
                          if (event.keyCode === 13) {
                            event.preventDefault();
                            createLinkButtonRef.current.click();
                          }
                        }}
                      />
                    </div>
                    <p className={style.smallText}>
                      Leaving the field empty would create a randomly generated
                      alias.
                    </p>
                  </div>
                  {adminErrorMsg !== `` ? (
                    <div className={style.errorMsg}>
                      <FaExclamationCircle />
                      <p>{adminErrorMsg}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <button
                    ref={createLinkButtonRef}
                    className={style.activeButton}
                    onClick={async () => {
                      if (nameField === "" || deepLinkField === "") {
                        setAdminErrorMsg(`Please fill in all required fields.`);
                        return;
                      } else if (
                        (await firebase
                          .firestore()
                          .collection("links")
                          .get()
                          .then((col) => {
                            for (const doc of col.docs) {
                              if (suffixField === doc.data().suffix) {
                                return true;
                              }
                            }
                            return;
                          })) === true
                      ) {
                        setAdminErrorMsg(`This link is already in use.`);
                        return;
                      } else if (
                        deepLinkField.search(
                          /(http|https):\/\/([a-zA-Z0-9][a-zA-Z0-9-]{0,}\.){1,}[a-zA-Z0-9]{2,}/
                        )
                      ) {
                        setAdminErrorMsg(`Invalid deep/long link provided`);
                        return;
                      } else if (
                        deepLinkField.includes(window.location.href) ||
                        deepLinkField.includes("bit.ly") ||
                        deepLinkField.includes("tinyurl.com") ||
                        deepLinkField.includes("goo.gl")
                      ) {
                        setAdminErrorMsg(`Site blacklisted`);
                        return;
                      }

                      const genRandAlias = () => {
                        const characters =
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";
                        let randomAlias = "";
                        for (var i = 0; i < 4; i++) {
                          randomAlias += characters.charAt(
                            Math.floor(Math.random() * characters.length)
                          );
                        }
                        firebase
                          .firestore()
                          .collection("links")
                          .get()
                          .then((col) => {
                            col.docs.map((doc) => {
                              if (randomAlias === doc.data().suffix) {
                                return genRandAlias();
                              }
                            });
                          });
                        return randomAlias;
                      };

                      if (
                        authAdmins.includes(firebase.auth().currentUser.email)
                      ) {
                        const newRandomAlias = genRandAlias();
                        firebase
                          .firestore()
                          .collection(`links`)
                          .doc(suffixField)
                          .set({
                            name: nameField ?? "ERROR",
                            link: deepLinkField ?? "ERROR",
                            suffix: suffixField || newRandomAlias,
                            date: firebase.firestore.Timestamp.fromDate(
                              new Date()
                            ),
                          })
                          .then(() => {
                            createdSuffix = suffixField || newRandomAlias;
                            console.log(
                              `Successful document written with ID: ${suffixField}`
                            );
                            setScreen(`success`);
                          })
                          .catch((error) => {
                            console.error(`Error adding document: ${error}`);
                          });
                      }
                    }}
                  >
                    Create
                  </button>
                  <div className={style.statusOverlay}></div>
                </div>
              );
            case `success`:
              return (
                <div className={style.content}>
                  <h3>Link created!</h3>
                  <p>Here's your new shortened link:</p>
                  <div
                    className={style.linkArea}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.href}${createdSuffix ?? "ERROR"}`
                      );
                      copiedPopupRef.className = `${style.copiedPopup} ${style.show}`;
                      setTimeout(() => {
                        copiedPopupRef.className = `${style.copiedPopup}`;
                      }, 5000);
                    }}
                  >
                    <div
                      className={style.copiedPopup}
                      ref={(el) => {
                        copiedPopupRef = el;
                      }}
                    >
                      Copied!
                    </div>
                    <p>
                      {window.location.href}
                      <span className={style.suffixBold}>{createdSuffix}</span>
                      <FaClipboard className={style.clipboardIcon} />
                    </p>
                  </div>
                  <p>Copy this link and share it!</p>
                  <p>
                    You may remove links by requesting at
                    ryan.theodore.2006@gmail.com.
                  </p>
                  <div>
                    <button
                      className={style.activeButton}
                      style={{ marginBottom: 10, marginTop: 30 }}
                      onClick={() => {
                        window.open(`${window.location.href}${createdSuffix ?? "ERROR"}`, "_blank")
                      }}
                    >
                      Test it out
                    </button>
                    <button
                      className={style.finalButton}
                      onClick={() => {
                        nameField = suffixField = deepLinkField = "";
                        setScreen(`admin`);
                      }}
                    >
                      Great! Another one!
                    </button>
                  </div>
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
        from SST Inc | 2020 | v2.0 <br/>
        v1.0 by{" "}
        <a className={style.link} href="https://www.linkedin.com/in/jia-chen-yee/">
          Jia Chen
        </a>{" "}
      </p>
    </div>
  );
}
