import React, { ReactNode } from "react";
import style from "./style.module.css";

export enum ButtonStyle {
  Primary,
  Secondary,
  Tertiary
}

export default function ThemeButton(props: {
  style?: ButtonStyle;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      className={`${style.button} ${(() => {
        switch (props.style) {
          case ButtonStyle.Primary: return style.primary;
          case ButtonStyle.Secondary: return style.secondary;
          case ButtonStyle.Tertiary: return style.tertiary
          default: return style.primary;
        }
      })()}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
