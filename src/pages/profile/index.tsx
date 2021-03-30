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
        <button styletype="primary" onClick={fbProvider.signIn}>
          Sign In
        </button>
      ) : (
        <button styletype="destructive" onClick={fbProvider.signOut}>
          Sign Out
        </button>
      )}
    </div>
  );
}
