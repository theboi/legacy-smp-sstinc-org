import React from 'react';
import style from "./style.module.css";

interface ErrorCode {
  msg: string,
  cap: string
}

export default function ErrorPage(props: { status: number }) {
  const codes: {[key: number]: ErrorCode} = {
    403: {
      msg: "For Biden",
      cap: "Haha funny"
    },
    404: {
      msg: "Not Found",
      cap: "IYKYK"
    },
  }
  const status = props.status ?? 404;

  return (
    <div className={style.main}>
      <figure className={style.fig} preset="shadow">
        <img
          src={`/assets/errors/${status}.png`}
          alt={`${status}: ${codes[status].msg}`}
          className={style.img}
        />
        <figcaption className={style.cap}>{codes[status].cap}</figcaption>
      </figure>
      <h1 className={style.errorCode}>{status}</h1>
      <h3>{codes[status].msg}</h3>
    </div>
  );
}
