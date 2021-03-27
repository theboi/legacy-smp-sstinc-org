import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

import style from "./style.module.css";

interface NavLink {
  icon: IconType;
  action: (() => void) | string;
}

export default function NavBar(props: { links: NavLink[] }) {
  const router = useRouter();

  return (
    <nav className={style.main}>
      {props.links.map((link, i) => {
        return (
          <button
            key={i}
            onClick={
              typeof link.action == "string" || link.action instanceof String
                ? () => router.push(link.action as string)
                : link.action
            }
            className={style.navLink}
          >
            <link.icon className={style.icon} />
          </button>
        );
      })}
    </nav>
  );
}
