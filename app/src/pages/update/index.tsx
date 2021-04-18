import { useRef, useState } from "react";
import * as React from "react";

import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";
import LabelField from "../../components/labelField";

export default function UpdatePage(props: { user: User }) {

  function confirmDetails() {}
//[1-4]0[1-8]
  return (
    <div className={style.main}>
      <h3>Update your account information</h3>
      <p>
        Welcome! In order to use SMP, we need to confirm some details about you.
      </p>
      <LabelField
        label="SST Class (Format: #0#)"
        placeholder="101"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.keyCode === 13) confirmDetails();
        }}
        onChange={() => {}}
      />
      <button preset="primary" onClick={confirmDetails}>
        Confirm
      </button>
    </div>
  );
}
