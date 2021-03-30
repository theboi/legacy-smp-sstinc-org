import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

import style from "./style.module.css";

interface NavLink {
  icon: React.ReactNode; // Allows for any FontAwesome icon or other React element like images
  action: (() => void) | string;
}

export default function NavBar(props: { links: NavLink[] }) {
  const router = useRouter();

  return (
    <nav className={style.main}>
      {props.links.map((link, i) => {
        return (
          <button
            styletype="tertiary"
            key={i}
            onClick={
              typeof link.action == "string" || link.action instanceof String
                ? () => router.push(link.action as string)
                : link.action
            }
            className={style.navLink}
          >
            {link.icon}       
          </button>
        );
      })}
    </nav>
  );
}
