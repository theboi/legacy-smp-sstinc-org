import React from "react";
import { fbProvider } from "../../model/fbProvider";
import { User } from "../../model/user";

import style from "./style.module.css";

export default function HomePage(props: { user: User }) {
  return (
    <div className={style.main}>
      <h3>SST Inc Management Platform (SMP)</h3>
      <p>
        SST Inc Management Platform is a unified platform for SST Inc managerial
        matters including the attendance taker and URL shortener.
      </p>
      {props.user === null ? (
        <>
          <p>Please use your SST Google Account to sign in.</p>
          <button preset="primary" onClick={fbProvider.auth.signIn}>
            Sign In
          </button>
        </>
      ) : null}
    </div>
  );
}
