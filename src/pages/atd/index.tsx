import React, { useEffect, useRef, useState } from "react";

import style from "./style.module.css";

import hash from "crypto-js/sha256";

import { User, UserRole } from "../../model/user";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { fbProvider } from "../../model/fbProvider";

export default function AtdPage(props: { user: User }) {

  const [time, setTime] = useState(0);
  const [key, setKey] = useState(getKeyCode());
  const [code, setCode] = useState([...Array(4)].map(() => ""));
  const [isLocked, setIsLocked] = useState(true);
  const [status, setStatus] = useState('Confirm');

  const refs = [...Array(4)].map(() => useRef(null));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(10 - new Date().getSeconds() % 10)
      return setKey(getKeyCode())
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function manageKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    e.persist();
    switch (true) {
      case e.keyCode === 8: // backspace
        if (code[i] === "") refs[i - 1]?.current.focus();
        else setCode((c) => {
          const t = [...c];
          t[i] = "";
          return t;
        });
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
      /** Handle after writing to Firestore */
      fbProvider.atd.checkIn(props.user).then(() => {
        setStatus(`Success`)
      }).catch(e => {
        setStatus(`Error`)
      }).finally(() => {
        setTimeout(() => {
          setStatus(`Confirm`)
        }, 2000);
      })
    } else {
      /** Code submission cooldown of 2 sec, informs user that code is incorrect */
      setStatus(`Invalid`)
      setCode([...Array(4)].map(() => ""))
      refs[0].current.focus()
      setTimeout(() => {
        setStatus(`Confirm`)
      }, 2000);
    }
  }

  function toggleLock() {
    setIsLocked((e) => !e);
  }

  return (
    <div className={style.main}>
      <h3>Attendance</h3>
      <p>Kindly enter the 4 digit code provided to check-in to SST Inc. Your attendance data will be recorded in the SST Inc
        Attendance Database (SAD).</p>
      <div className={style.code}>
        {(isLocked ? code : key.split("")).map((n, i) => (
          <input
            type="text"
            className={style.number}
            key={i}
            value={n}
            // readOnly
            onKeyDown={(e) => manageKeyDown(e, i)}
            /** Required so React does not throw an error for missing onChange/readOnly */
            onChange={() => {}}
            ref={refs[i]}
          />
        ))}
        <h1>{!isLocked ? time : null}</h1>
      </div>
      <div className={style.buttons}>
        <button preset={(() => {
          switch (status) {
            case `Error`: case `Invalid`: return "destructive"
            case `Success`: return "success"
            default: return "primary"
          }
        })()} onClick={confirmCode} disabled={!isLocked || status !== "Confirm" || code.join('').length != 4}>
          {status}
        </button>
        {props.user?.role >= UserRole.ExCo ? (
          <div className={style.lock}>
            <button preset="secondary" onClick={toggleLock}>
              {isLocked ? <FaLock /> : <FaLockOpen />}
            </button>
          </div>
        ) : null}
      </div>
      <button preset="secondary" disabled>Scan a QR Code instead</button>
    </div>
  );
}
