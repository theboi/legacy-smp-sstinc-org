import React, { useEffect, useRef, useState } from "react";
import { AppProps } from "next/app";
import "./styles.css";
import style from "./style.module.css";
import Head from "next/head";

import ThemeButton, { ButtonStyle } from "../../components/button";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";

export default function MyApp({ Component, pageProps }: AppProps) {
  let loadingOverlayRef = useRef(null);

  const [user, setUser] = useState<User>(null);

  fbProvider.addIdTokenChangedListener((user) => {
    setUser(user);
  });

  useEffect(() => {
    (async () => {
      await fbProvider.checkForAuth();

      loadingOverlayRef.current.style.display = "none";

      switch (fbProvider.currentUser?.role) {
        case UserRole.Admin:
        default: 
        console.error(
          "Permission denied. Only for members of SST. Please use your school account to log in. You have been signed out."
        );
      }
      
    })();
  });

  return (
    <>
      <Head>
        <title>SST Inc Management Process</title>
        <meta property="og:title" content="SST Inc Management Process" />
        <meta property="og:image" content="/assets/sstinc-icon.png" />
        <meta property="og:description" content="SST Inc Management Process" />
        <meta property="og:url" content="go.sstinc.org" />
        <meta name="twitter:card" content="/assets/sstinc-icon.png" />
      </Head>
      <div className={style.main}>
        <a href="https://sstinc.org" rel="noreferrer noopener" target="_blank">
          <img
            src="/assets/sstinc-icon.png"
            alt="SST Inc Icon"
            width={100}
            height={100}
          />
        </a>
        <div className={style.sideSplit}>
          <div className={`${style.shadowBox} ${style.contentDiv}`}>
            <Component {...pageProps} />
            <div className={style.loadingOverlay} ref={loadingOverlayRef}>
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                display="block"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#00a4ff"
                  strokeWidth="10"
                  r="35"
                  strokeDasharray="164.93361431346415 56.97787143782138"
                  transform="rotate(287.844 50 50)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  />
                </circle>
              </svg>
            </div>
          </div>
          <nav className={style.shadowBox}>
            <ThemeButton
              style={ButtonStyle.Tertiary}
              onClick={user === null ? fbProvider.signIn : fbProvider.signOut}
            >
              {user === null ? <FaSignInAlt /> : <FaSignOutAlt />}
            </ThemeButton>
          </nav>
        </div>
        <div className={style.credits}>
          <p>
            Made with ♥ by{" "}
            <a
              href="https://www.ryanthe.com"
              target="_blank"
              className={style.link}
            >
              Ryan The
            </a>{" "}
            from SST Inc, 2020, v2.0.0.
          </p>
          <p>
            Open sourced on{" "}
            <a
              href="https://github.com/theboi/go-sstinc-org"
              target="_blank"
              className={style.link}
            >
              GitHub
            </a>
            .{" "}
          </p>
        </div>
      </div>
    </>
  );
}
