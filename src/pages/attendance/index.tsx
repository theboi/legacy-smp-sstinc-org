import React from "react";
import ThemeButton, { ButtonStyle } from "../../components/button";

import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User } from "../../model/user";

export default function AttendancePage(props: { user: User }) {
  return (
    <div className={style.main}>
      <h3>Attendance</h3>
      <p>Kindly enter the 4 digit code provided to check-in to SST Inc.</p>
    </div>
  );
}
