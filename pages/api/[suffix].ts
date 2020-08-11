import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { suffix },
  } = req;

  const firebase = require("firebase");
  let link
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
        res.writeHead(404, "Not found");
      } else {
        res.writeHead(307, { Location: link });
      }
      res.end();
    });
};
