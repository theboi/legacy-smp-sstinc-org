import React, { useEffect } from "react";
import { FaClipboard } from "react-icons/fa";

import style from "./style.module.css";
import { useRouter } from "next/router";

let createdSuffix = "ERROR";

export default function HomePage() {
  return (
    <div className={style.content}>
      <h3>SST Inc Management Process (SMP)</h3>
      <p>
        Only for use by SST Inc Executive Committee (ExCo) and Board Of
        Directors (BOD). Your attendance data will be recorded in the SST Inc
        Attendance Database (SAD).
      </p>
      <p>Please use your SST Google Account to sign in.</p>
    </div>
  )
}

function SuccessPage(props: {}) {
  let copiedPopupRef: HTMLDivElement;

  const router = useRouter();

  useEffect(() => {
    // if (screen === `success`) {
    navigator.clipboard.writeText(
      `${window.location.href}${createdSuffix ?? "ERROR"}`
    );
    copiedPopupRef.className = `${style.copiedPopup} ${style.show}`;
    setTimeout(() => {
      if (copiedPopupRef !== null) {
        copiedPopupRef.className = `${style.copiedPopup}`;
      }
    }, 5000);
    // }
  });

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
        You may remove links by requesting at ryan.theodore.2006@gmail.com.
        (Until I find time to implement it in the admin console...)
      </p>
      <div>
        <button
          className={style.activeButton}
          style={{ marginBottom: 10, marginTop: 30 }}
          onClick={() => {
            window.open(
              `${window.location.href}${createdSuffix ?? "ERROR"}`,
              "_blank"
            );
          }}
        >
          Test it out
        </button>
        <button
          className={style.finalButton}
          onClick={() => {
            nameField = suffixField = deepLinkField = "";
            router.push(`/admin`);
          }}
        >
          Great! Another one!
        </button>
      </div>
    </div>
  );
}