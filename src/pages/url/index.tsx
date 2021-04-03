import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import style from "./style.module.css";
import { User, UserRole } from "../../model/user";
import LabelField from "../../components/labelField";

let deepLinkField = "";
let nameField = "";
let suffixField = "";

let createdSuffix = "ERROR";

export default function UrlPage(props: { user: User }) {
  const router = useRouter();

  const [adminErrorMsg, setAdminErrorMsg] = useState(``);

  let deepLinkFieldRef = useRef(null);
  let suffixFieldRef = useRef(null);

  nameField = suffixField = deepLinkField = "";

  useEffect(() => {
    if (props.user?.role != UserRole.ExCo) console.log("oop");
  }, [props.user]);

  function createUrl() {
    async () => {
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
      } else if (
        deepLinkField.includes("dQw4w9WgXcQ") ||
        deepLinkField.includes("ub82Xb1C8os") ||
        deepLinkField.includes("8ybW48rKBME")
      ) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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

      if (props.user?.role === UserRole.ExCo) {
        const newRandomAlias = genRandAlias();
        firebase
          .firestore()
          .collection(`links`)
          .doc(suffixField || newRandomAlias)
          .set({
            name: nameField ?? "ERROR",
            link: deepLinkField ?? "ERROR",
            suffix: suffixField || newRandomAlias,
            // date: firebase.firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            createdSuffix = suffixField || newRandomAlias;
            console.log(`Successful document written with ID: ${suffixField}`);
            router.push(`/success`);
          })
          .catch((error) => {
            console.error(`Error adding document: ${error}`);
          });
      }
    };
  }

  return (
    <div className={style.main}>
      <h3>Create a new Link</h3>
      <div className={style.newFieldDiv}>
        <LabelField
          label="NAME*"
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
        <LabelField
          label="LONG URL*"
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
        <LabelField
          label="SHORT URL"
          placeholder="sstinc"
          onChange={(event) => {
            suffixField = event.target.value;
          }}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              event.preventDefault();
              createUrl()
            }
          }}
          leftDetail={<p className={style.domain}>go.sstinc.org/</p>}
        />
        <p className={style.smallText}>
          Leaving the field empty would create a randomly generated alias.
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
      <button onClick={createUrl}>Create</button>
      <div className={style.statusOverlay}></div>
    </div>
  );
}
