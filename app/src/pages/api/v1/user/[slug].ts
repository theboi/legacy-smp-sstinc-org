import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import * as admin from "firebase-admin";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [key: string]: string };
  res.status(200).json(await getUserAPI(slug));
};

// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//   // Send token to your backend via HTTPS
//   // ...
// }).catch(function(error) {
//   // Handle error
// });

export const getUserAPI = async (slug: string): Promise<Page> => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  if (!admin.app)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    });

  // admin
  //   .auth()
  //   .verifyIdToken(auth)
  //   .then((decodedToken) => {
  //     const uid = decodedToken.uid;
  //   })
  //   .catch((error) => {});

  let pn = "";
  if (slug[0] === "@") {
    pn = "Handle";
  } else if (slug.startsWith("fb_")) {
    pn = "Firebase ID";
  } else if (slug.startsWith("tgb_")) {
    pn = "Telegram ID";
  } else if (slug.startsWith("inc_")) {
    pn = "Inc ID";
  } else {
    pn = "Email";
  }

  if (slug[0] === "@") slug = slug.slice(1);
  const response = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
    filter: {
      property: pn,
      text: {
        equals: slug,
      },
    },
  });

  return response.results[0];
};
