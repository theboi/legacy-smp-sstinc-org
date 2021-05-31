import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { AppProps } from "next/app";
import "./styles.scss";
import "./cssreset.scss";
import Head from "next/head";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { useRouter } from "next/router";
import style from "./style.module.css";

import theme from "../../model/theme";

import { User, UserRole } from "../../services/userold";
import ErrorPage from "../404";
import ProfilePage from "../account/profile";
import { AuthProvider } from "../../providers/auth";
import { NavBar } from "../../components/app/navBar";
import { Credits } from "../../components/app/credits";

export const authPaths: { [key: string]: UserRole } = {
  "/url": UserRole.ExCo,
  "/train": UserRole.Trainee,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const loadingOverlayRef = useRef(null);

  const [curUser, setCurUser] = useState<User>(null);
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    if (window) {
      setHostname(window.location.hostname);
    }
  });
  useEffect(() => {
    AuthProvider.addIdTokenChangedListener((user: User) => {
      setCurUser(user);
      // console.log(user)
      // if (user?.iid !== undefined && user?.role === UserRole.Alien) {
      //   router.replace('/update')
      // }
    });
  }, []);

  useEffect(() => {
    (async () => {
      await AuthProvider.checkForAuth();
      loadingOverlayRef.current.style.display = "none";
    })();
  }, [curUser]);

  // function genRandAlias() {
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";
  //   let randomAlias = "";
  //   for (var i = 0; i < 4; i++) {
  //     randomAlias += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }
  //   firebase
  //     .firestore()
  //     .collection("links")
  //     .get()
  //     .then((col) => {
  //       col.docs.map((doc) => {
  //         if (randomAlias === doc.data().suffix) {
  //           return genRandAlias();
  //         }
  //       });
  //     });
  //   return randomAlias;
  // }

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
      <ChakraProvider theme={theme} resetCSS={false}>
        {hostname === "go.sstinc.org" || hostname === "qr.sstinc.org" ? (
          <div className={style.alert}>
            <p>
              <code>go.sstinc.org</code> and
              <code>qr.sstinc.org</code> will cease operation beginning June
              2021. Please use the new unified{" "}
              <a href="https://smp.sstinc.org">
                <code>smp.sstinc.org</code>
              </a>{" "}
              instead.
            </p>
          </div>
        ) : null}
        <AppScaffold user={curUser}>
          <div className={style.content}>
            {(() => {
              switch (true) {
                case authPaths[router.pathname] === undefined:
                  return <Component {...pageProps} user={curUser} />;
                case curUser?.role === undefined:
                  return <ProfilePage user={curUser} />;
                case curUser?.role >= authPaths[router.pathname]: // isAuth
                  return <Component {...pageProps} user={curUser} />;
                default:
                  return <ErrorPage status={403} />;
              }
            })()}
            <LoadingOverlay ref={loadingOverlayRef} />
          </div>
        </AppScaffold>
      </ChakraProvider>
    </>
  );
}

const LoadingOverlay = React.forwardRef(
  (_, ref: React.MutableRefObject<HTMLDivElement>) => (
    <Box ref={ref} className={style.loadingOverlay}>
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
    </Box>
  )
);

const AppScaffold = (props: { children: React.ReactNode; user: User }) => {
  return (
    <div className={style.main}>
      <div className={style.headnav}>
        <nav className={style.nav}>
          <a
            className={style.icon}
            href="https://sstinc.org"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img
              src="/assets/sstinc-icon.png"
              alt="SST Inc Icon"
              width={100}
              height={100}
            />
          </a>
          <NavBar user={props.user} />
        </nav>
      </div>
      {props.children}
      <Credits />
    </div>
  );
};
