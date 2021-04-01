import React from "react";

import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User } from "../../model/user";

export default function ProfilePage(props: { user: User }) {
  console.log(props.user)
  return (
    <div className={style.main}>
      <p>{props.user?.email}</p>
      {props.user === null ? (
        <button preset="primary" onClick={fbProvider.auth.signIn}>
          Sign In
        </button>
      ) : (
        <button preset="destructive" onClick={fbProvider.auth.signOut}>
          Sign Out
        </button>
      )}
    </div>
  );
}
