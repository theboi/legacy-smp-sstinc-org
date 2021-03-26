import React from "react";
import style from "./style.module.css";

export default function ErrorPage(props: {status: number}) {
  const msg = (() => {
    switch (props.status) {
      case 403: return "For Biden"
      default: return "Page Not Found"
    }
  })()
  const status = props.status ?? 404
  const src = (() => {
    switch (props.status) {
      case 403: return "https://apnews.com/article/c142b9f08fa741c89bc26330d43e3abc"
      default: return ""
    }
  })()

  return (
    <div className={style.main}>
      <img src={`/assets/errors/${status}.png`} alt={`${status}: ${msg}, from ${src}`} className={style.img} />
      <h1 className={style.errorCode}>{status}</h1>
      <h3>{msg}</h3>
    </div>
  );
}
