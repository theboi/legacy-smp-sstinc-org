import React from "react";

import style from "./style.module.css";

export default function LabelField(props: {
  label: string;
  placeholder: string;
  onChange: (e) => void;
  onKeyUp: (e) => void;
  leftDetail?: React.ReactNode;
  rightDetail?: React.ReactNode;
}) {
  return (
    <div className={style.main}>
      <label htmlFor={props.label}>{props.label}</label>
      <div className={style.field}>
        {props.leftDetail}
        <input
          id={props.label}
          type="text"
          placeholder={props.placeholder}
          onChange={props.onChange}
          onKeyUp={props.onKeyUp}
        />
        {props.rightDetail}
      </div>
    </div>
  );
}
