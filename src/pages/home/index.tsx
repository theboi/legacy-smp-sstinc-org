import React from "react";

import style from "./style.module.css";

export default function HomePage() {
  return (
    <div className={style.main}>
      <h3>SST Inc Management Platform (SMP)</h3>
      <p>
        Only for use by SST Inc Executive Committee (ExCo) and Board Of
        Directors (BOD). Your attendance data will be recorded in the SST Inc
        Attendance Database (SAD).
      </p>
      <p>Please use your SST Google Account to sign in.</p>
    </div>
  )
}