import React from "react";
import style from "./style.module.css";

export default function Error404Page() {
  return (
    <div className={style.main}>
      <h1 className={style.errorCode}>404</h1>
      <h3>Page Not Found</h3>
    </div>
  );
}
