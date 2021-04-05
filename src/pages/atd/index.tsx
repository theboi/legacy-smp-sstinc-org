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
  const [debug, setDebug] = useState('')

  const refs: React.MutableRefObject<HTMLInputElement>[] = [...Array(4)].map(() => useRef(null));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(10 - new Date().getSeconds() % 10)
      return setKey(getKeyCode())
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function onCodeKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    switch (true) {
      case e.keyCode === 8: // backspace
        if (code[i] === "") refs[i - 1]?.current.focus();
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
    }
  }

  function onCodeChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const val = e.target.value
    const newChar = val.charAt(val.length - 1)
    const charCode = newChar.charCodeAt(0);

    if (newChar === "") { // backspace
      setCode((c) => {
        const t = [...c];
        t[i] = "";
        return t;
      });
      // refs[i - 1]?.current?.focus()
    } else if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      setCode((c) => {
        const t = [...c];
        t[i] = newChar.toUpperCase();
        return t;
      });
      refs[i + 1]?.current?.focus()
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
      <p>{debug}</p>
      <p>{code.join()}</p>
      <div className={style.code}>
        {(isLocked ? code : key.split("")).map((n, i) => (
          <input
          ref={refs[i]}
          value={code[i]}
          type="text"
          className={style.number}
          key={i}
          onKeyDown={(e) => onCodeKeyDown(e, i)}
          onChange={(e) => onCodeChange(e, i)}
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
