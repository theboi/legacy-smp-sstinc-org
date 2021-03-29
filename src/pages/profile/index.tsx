import React from "react";
import ThemeButton, { ButtonStyle } from "../../components/button";

import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";

export default function ProfilePage(props: { user: User }) {
  console.log(props.user)
  return (
    <div className={style.main}>
      <p>{props.user?.email}</p>
      {props.user === null ? (
        <ThemeButton style={ButtonStyle.Primary} onClick={fbProvider.signIn}>
          Sign In
        </ThemeButton>
      ) : (
        <ThemeButton
          style={ButtonStyle.Destructive}
          onClick={fbProvider.signOut}
        >
          Sign Out
        </ThemeButton>
      )}
    </div>
  );
}
