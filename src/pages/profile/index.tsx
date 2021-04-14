import React from "react";

import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";

export default function ProfilePage(props: { user: User }) {
  console.log(Object.keys(User));
  return (
    <div className={style.main}>
      {props.user === null ? (
        <button preset="primary" onClick={fbProvider.auth.signIn}>
          Sign In
        </button>
      ) : (
        <>
          <div>
            <img
              src={props.user?.photoURL}
              alt={props.user?.displayName}
              className={style.pfp}
            />
            <div>
              <h3>{props.user?.displayName}</h3>
              <p>{props.user?.email}</p>
            </div>
          </div>
          <p>{props.user?.buff}</p>
          <p className={style.rbadge}>{UserRole[props.user?.role]}</p>
          <button preset="destructive" onClick={fbProvider.auth.signOut}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
