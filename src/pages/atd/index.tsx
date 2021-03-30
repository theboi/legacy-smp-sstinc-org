import React, { useEffect, useRef, useState } from "react";

import style from "./style.module.css";

import hash from "crypto-js/sha256";

import { User, UserRole } from "../../model/user";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { fbProvider } from "../../model/fbProvider";

export default function AtdPage(props: { user: User }) {
  const [key, setKey] = useState(getKeyCode());
  const [code, setCode] = useState([...Array(4)].map(() => ""));
  const [isLocked, setIsLocked] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  const refs = [...Array(4)].map(() => useRef(null));

  useEffect(() => {
    const interval = setInterval(() => setKey(getKeyCode()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function manageKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    e.persist();
    switch (true) {
      case e.keyCode === 8: // backspace
        setCode((c) => {
          const t = [...c];
          t[i] = "";
          return t;
        });
        refs[i - 1]?.current.focus();
        break;
      case e.keyCode === 37: // leftArrow
        refs[i - 1]?.current.focus();
        break;
      case e.keyCode === 13: // return
        refs[i].current.blur();
        if (code.join('').length == 4) confirmCode()
        break;
      case e.keyCode === 39: // rightArrow
        refs[i + 1]?.current.focus()
        break;
      case (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 65 && e.keyCode <= 90): // alphanumeric
        setCode((c) => {
          const t = [...c];
          t[i] = String.fromCharCode(e.keyCode);
          return t;
        });
        refs[i + 1]?.current?.focus()
        break;
    }
  }

  function getKeyCode() {
    const epochSeconds = new Date().getTime() / 1000;
    return hash("sstinc" + (epochSeconds - (epochSeconds % 10)))
      .toString()
      .slice(0, 4)
      .toUpperCase();
  }

  function confirmCode() {
    console.log(code.join(""));
    if (code.join("") === getKeyCode()) {
      fbProvider.atd.checkIn(props.user)
    } else {
      /** Code submission cooldown of 2 sec, informs user that code is incorrect */
      setIsInvalid(true)
      setCode([...Array(4)].map(() => ""))
      refs[0].current.focus()
      setTimeout(() => {
        setIsInvalid(false)
      }, 2000);
    }
  }

  function toggleLock() {
    setIsLocked((e) => !e);
  }

  return (
    <div className={style.main}>
      <h3>Attendance</h3>
      <p>Kindly enter the 4 digit code provided to check-in to SST Inc.</p>
      <div className={style.code}>
        {(isLocked ? code : key.split("")).map((n, i) => (
          <input
            type="text"
            className={style.number}
            key={i}
            value={n}
            readOnly
            onKeyDown={(e) => manageKeyDown(e, i)}
            ref={refs[i]}
          />
        ))}
      </div>
      <div className={style.buttons}>
        <button styletype={isInvalid ? "destructive" : "primary"} onClick={confirmCode} disabled={isInvalid || code.join('').length != 4}>
          {isInvalid ? "Invalid" : "Confirm"}
        </button>
        {props.user?.role === UserRole.Admin ? (
          <div className={style.lock}>
            <button styletype="secondary" onClick={toggleLock}>
              {isLocked ? <FaLock /> : <FaLockOpen />}
            </button>
          </div>
        ) : null}
      </div>
      <button styletype="secondary">Scan a QR Code instead</button>
    </div>
  );
}
