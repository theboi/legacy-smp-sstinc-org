import React, { useEffect, useRef, useState } from "react";
import { AppProps } from "next/app";
import "./styles.css";
import style from "./style.module.css";
import Head from "next/head";

import { FaClipboardCheck, FaClipboardList, FaHome, FaLink, FaSignInAlt } from "react-icons/fa";
import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";
import { useRouter } from "next/router";
import ErrorPage from "../404";
import NavBar from "../../components/navbar";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  let loadingOverlayRef = useRef(null);

  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fbProvider.auth.addIdTokenChangedListener((user: User) => {
      setUser(user);
    });
  }, [])

  useEffect(() => {
    (async () => {
      await fbProvider.auth.checkForAuth();
      loadingOverlayRef.current.style.display = "none";
    })();
  }, [user]);

  function isAuth(): boolean {
    if (router.pathname !== '/url') return true
    switch (fbProvider.auth.currentUser?.role) {
      case UserRole.Admin: return true
      default: return false
    }
  }

  return (
    <>
      <Head>
        <title>SST Inc Management Platform</title>
        <meta property="og:title" content="SST Inc Management Platform" />
        <meta property="og:image" content="/assets/sstinc-icon.png" />
        <meta property="og:description" content="SST Inc Management Platform" />
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
          <div preset="shadow">
            <div className={style.content}>
            {isAuth() ? (
              <Component {...pageProps} user={user} />
            ) : (
              <ErrorPage status={403}/>
            )}
            <LoadingOverlay ref={loadingOverlayRef} />
            </div>
          </div>
          <NavBar links={[
            {
              icon: user === null ? <FaSignInAlt /> : <img src={user.photoURL} height={40} style={{borderRadius: 10}}/>,
              action: user === null ? fbProvider.auth.signIn : '/profile'
            },
            {
              icon: <FaHome />,
              action: '/home'
            },
            {
              icon: <FaLink />,
              action: '/url'
            },
            {
              icon: <FaClipboardList /> /* <FaClipboardCheck /> */,
              action: '/atd'
            },
          ]}/>
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

const LoadingOverlay = React.forwardRef(
  (_, ref: React.MutableRefObject<HTMLDivElement>) => (
    <div className={style.loadingOverlay} ref={ref}>
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
  )
);
