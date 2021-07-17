import {
  Page,
  RichTextPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { Client } from "@notionhq/client/build/src";
import * as admin from "firebase-admin";
import { APIResponse, HTTPStatusCode } from "../../typings/api";
import { NextApiRequest, NextApiResponse } from "next";
import getNotionAPIKey from "./getNotionAPIKey";

export const getFirebaseToken = async (
  auth: string
): Promise<admin.auth.DecodedIdToken> => {
  const serviceAccount = require("../../../google.env.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  try {
    return await admin.auth().verifyIdToken(auth);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const handleAuth = async <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (args: { [k: string]: any }) => Promise<APIResponse<T>>,
  args: { [k: string]: any } = {}
): Promise<APIResponse<T>> => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin"
  );

  const { authorization: auth } = req.headers as { [k: string]: string };

  console.log(auth, req.headers);
  if (auth === undefined) return { status: HTTPStatusCode.Unauthorized };

  const notion = new Client({ auth: getNotionAPIKey() });

  const pn = auth.startsWith("Basic") ? "Telegram" : "Firebase";

  const key = auth.startsWith("Basic")
    ? auth.split(" ")[1]
    : (await getFirebaseToken(auth.split(" ")[1])).uid;

  if (key === undefined) return { status: HTTPStatusCode.Forbidden };

  const data = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
    filter: {
      property: pn,
      text: {
        equals: key,
      },
    },
  });

  if (data.results.length === 0) return { status: HTTPStatusCode.Forbidden };
  else if (data.results.length > 1)
    return { status: HTTPStatusCode.MultipleChoice };

  // const content = JSON.parse(
  //   (res.results[0].properties["Rate Limit"] as RichTextPropertyValue)
  //     ?.rich_text[0]?.plain_text ?? "[]"
  // );

  // const now = new Date().getTime();
  // if (content[0] === undefined || content[0] + 30000 < now) {
  //   // 100 requests per 30 s
  //   content[0] = now;
  //   content[1] = 1;
  // } else {
  //   content[1]++;
  //   if (content[1] > 100) return { status: HTTPStatusCode.TooManyRequests };
  // }

  // const upd = await notion.pages.update({
  //   page_id: res.results[0].id,
  //   properties: {
  //     "Rate Limit": {
  //       type: "rich_text",
  //       rich_text: [
  //         {
  //           type: "text",
  //           text: {
  //             content: JSON.stringify(content),
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  return callback({ user: data.results[0] as Page, notion, ...args });
};
