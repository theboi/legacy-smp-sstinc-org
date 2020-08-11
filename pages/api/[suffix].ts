import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { suffix },
  } = req;

  const firebase = require("firebase");
  let link;
  const firebaseConfig = {
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "go-sstinc-org.firebaseapp.com",
    databaseURL: "https://go-sstinc-org.firebaseio.com",
    projectId: "go-sstinc-org",
    storageBucket: "go-sstinc-org.appspot.com",
    messagingSenderId: "383271500516",
    appId: "1:383271500516:web:dbf5a044580ef81b4e8af1",
    measurementId: "G-SPL13C4C16",
  };
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

  await firebase
    .firestore()
    .collection("links")
    .get()
    .then((col) => {
      col.docs.map((doc) => {
        if (doc.data().suffix === suffix) {
          link = doc.data().link;
        }
      });
    })
    .then(() => {
      if (!link) {
        res.writeHead(404, "Not found", { "Content-Type": "html" });
        res.end(PAGE_404);
      } else {
        res.writeHead(307, { Location: link });
        res.end();
      }
    });
};

const PAGE_404 = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Rubik', sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  place-items: center;
  text-align: left;
}

.contentDiv {
  padding: 30px 10px;
  margin: 0 10px;
  border: solid #fefefe 1px;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #eeeeee;
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 90vw;
  max-width: 700px;
  position: relative;
  background-color: #fcfcfc;
}

.errorCode {
  font-size: 100px;
}
</style>
<div class="main">
<a href="https://sstinc.org" rel="noreferrer noopener">
  <img
    src="/assets/sstinc-icon.png"
    alt="SST Inc Icon"
    width="100"
    height="100"
  />
</a>
<div class="contentDiv">
  <h1 class="errorCode">404</h1>
  <h3>Page Not Found</h3>
</div>
</div>
`