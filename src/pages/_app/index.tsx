import React, { useEffect, useRef, useState } from "react";
import { AppProps } from "next/app";
import "./styles.css";
import style from "./style.module.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react"

import {
  FaBars,
  FaClipboardCheck,
  FaClipboardList,
  FaHome,
  FaLink,
  FaSignInAlt,
  FaTimes,
} from "react-icons/fa";
import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";
import { useRouter } from "next/router";
import ErrorPage from "../404";
import ProfilePage from "../profile";

const paths: { [key: string]: UserRole } = {
  "/url": UserRole.ExCo,
  "/atd": UserRole.Trainee,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  let loadingOverlayRef = useRef(null);

  const [user, setUser] = useState<User>(null);
  const [hostname, setHostname] = useState("")

  useEffect(() => {
    if (window) {
      setHostname(window.location.hostname)
    }
  })
  useEffect(() => {
    fbProvider.auth.addIdTokenChangedListener((user: User) => {
      setUser(user);
      // console.log(user)
      // if (user?.iid !== undefined && user?.role === UserRole.Alien) {
      //   router.replace('/update')
      // }
    });
  }, []);

  useEffect(() => {
    (async () => {
      await fbProvider.auth.checkForAuth();
      loadingOverlayRef.current.style.display = "none";
    })();
  }, [user]);

  function isAuth(): boolean {
    if (user?.role >= paths[router.pathname]) return true;
    else return false;
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
      <ChakraProvider>
      <div className={style.main}>
        {hostname === "go.sstinc.org" || hostname === "qr.sstinc.org" ? (
          <div className={style.alert}>
          <p>
            <code>go.sstinc.org</code> and <code>qr.sstinc.org</code> will
            cease operation beginning June 2021. Please use the new unified{" "}
            <a href="https://smp.sstinc.org">
              <code>smp.sstinc.org</code>
            </a>{" "}
            instead.
          </p>
        </div>
        ) : null}
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
              {(() => {
                if (paths[router.pathname] === undefined)
                  return <Component {...pageProps} user={user} />;
                else if (user?.role === undefined)
                  return <ProfilePage user={user} />;
                else if (isAuth())
                  return <Component {...pageProps} user={user} />;
                else return <ErrorPage status={403} />;
              })()}
              <LoadingOverlay ref={loadingOverlayRef} />
            </div>
          </div>
          <NavBar
            links={[
              {
                icon:
                  user === null ? (
                    <FaSignInAlt />
                  ) : (
                    <img
                      src={user.photoURL}
                      height={40}
                      style={{ borderRadius: 10 }}
                    />
                  ),
                action: user === null ? fbProvider.auth.signIn : "/profile",
              },
              {
                icon: <FaHome />,
                action: "/home",
              },
              {
                icon: <FaLink />,
                action: "/url",
              },
              {
                icon: <FaClipboardList /> /* <FaClipboardCheck /> */,
                action: "/atd",
              },
            ]}
          />
        </div>
        <Credits />
      </div>
      </ChakraProvider>
    </>
  );
}

interface NavLink {
  icon: React.ReactNode; // Allows for any FontAwesome icon or other React element like images
  action: (() => void) | string;
}

const NavBar = (props: { links: NavLink[] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`${style.ham} ${!isOpen ? style.isClose : null}`}
        preset="shadow"
        onClick={() => setIsOpen((c) => !c)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={style.nav} preset="shadow">
        {props.links.map((link, i) => {
          return (
            <button
              preset="tertiary"
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
    </>
  );
};

const Credits = () => (
  <div className={style.credits}>
    <p>
      Made with ♥&#xFE0E; by{" "}
      <a href="https://www.ryanthe.com" target="_blank" className={style.link}>
        Ryan The
      </a>{" "}
      from SST Inc, 2021, v2.0.1.
    </p>
    <p>
      Open sourced on{" "}
      <a
        href="https://github.com/theboi/smp-sstinc-org"
        target="_blank"
        className={style.link}
      >
        GitHub
      </a>
      .{" "}
    </p>
  </div>
);

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
