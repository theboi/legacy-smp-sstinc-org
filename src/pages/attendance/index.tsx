import React, { FormEventHandler, useRef, useState } from "react";

import style from "./style.module.css";

import { User } from "../../model/user";
import ThemeButton, { ButtonStyle } from "../../components/button";

export default function AttendancePage(props: { user: User }) {
  const [code, setCode] = useState([...Array(4)].map(() => ""));

  const refs = [...Array(4)].map(() => useRef(null));

  function manageKeyDown(i) {(e) => {
    e.persist();
    switch (true) {
      case e.keyCode === 8: // backspace
        setCode((c) => {
          const t = [...c]
          t[i] = "";
          return t;
        });
        refs[i - 1]?.current.focus() ?? null;
        break;
      case e.keyCode === 37: // leftArrow
        refs[i - 1]?.current.focus() ?? refs[i].current.blur();
        break;
      case e.keyCode === 13: // return
        refs[i].current.blur();
        break;
      case e.keyCode === 39: // rightArrow
        refs[i + 1]?.current.focus() ?? refs[i].current.blur();
        break;
      case e.keyCode >= 48 && e.keyCode <= 57: // numbers
        setCode((c) => {
          const t = [...c]
          t[i] = String.fromCharCode(e.keyCode);
          return t;
        });
        refs[i + 1]?.current.focus() ?? refs[i].current.blur();
        break;
    }
  }}

  function confirmCode() {
    
  }

  return (
    <div className={style.main}>
      <h3>Attendance</h3>
      <p>Kindly enter the 4 digit code provided to check-in to SST Inc.</p>
      <div className={style.code}>
        {code.map((n, i) => (
          <input
            type="text"
            className={style.number}
            key={i}
            value={n}
            readOnly
            onKeyDown={() => manageKeyDown(i)}
            ref={refs[i]}
          />
        ))}
      </div>
      <ThemeButton style={ButtonStyle.Primary} onClick={confirmCode}>Confirm</ThemeButton>
      {/* <ThemeButton style={ButtonStyle.Tertiary}>Scan the QR Code instead</ThemeButton> */}
    </div>
  );
}
