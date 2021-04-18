import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaClipboard } from 'react-icons/fa';

import style from './style.module.css';

export default function SuccessPage(props: {}) {
  let copiedPopupRef: HTMLDivElement;

  const router = useRouter();

  const { suffix } = router.query

  useEffect(() => {
    // if (screen === `success`) {
    navigator.clipboard.writeText(
      `${router.basePath}${suffix ?? "ERROR"}`
    );
    copiedPopupRef.className = `${style.copiedPopup} ${style.show}`;
    setTimeout(() => {
      if (copiedPopupRef !== null) {
        copiedPopupRef.className = `${style.copiedPopup}`;
      }
    }, 5000);
    // }
  });

  return (
    <div className={style.content}>
      <h3>Link created!</h3>
      <p>Here's your new shortened link:</p>
      <div
        className={style.linkArea}
        onClick={() => {
          navigator.clipboard.writeText(
            `${router.basePath}${suffix ?? "ERROR"}`
          );
          copiedPopupRef.className = `${style.copiedPopup} ${style.show}`;
          setTimeout(() => {
            copiedPopupRef.className = `${style.copiedPopup}`;
          }, 5000);
        }}
      >
        <div
          className={style.copiedPopup}
          ref={(el) => {
            copiedPopupRef = el;
          }}
        >
          Copied!
        </div>
        <p>
          {router.basePath}
          <span className={style.suffixBold}>{suffix}</span>
          <FaClipboard className={style.clipboardIcon} />
        </p>
      </div>
      <p>Copy this link and share it!</p>
      <p>
        You may remove links by requesting at ryan.theodore.2006@gmail.com.
        (Until I find time to implement it in the admin console...)
      </p>
      <div>
        <button
          className={style.activeButton}
          style={{ marginBottom: 10, marginTop: 30 }}
          onClick={() => {
            window.open(
              `${router.basePath}${suffix ?? "ERROR"}`,
              "_blank"
            );
          }}
        >
          Test it out
        </button>
        <button
          className={style.finalButton}
          onClick={() => {
            router.push(`/admin`);
          }}
        >
          Great! Another one!
        </button>
      </div>
    </div>
  );
}