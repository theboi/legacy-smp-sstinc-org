// import { Client } from "@notionhq/client/build/src";
// import { Page, RichTextPropertyValue } from "@notionhq/client/build/src/api-types";
// import { NextApiResponse, NextApiRequest } from "next";
// import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
// import crypto from "crypto";
// import { handleAuth } from "../../../../utils/api";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { tid, handle } = req.query as { [k: string]: string };
//   const data = await handleAuth(req, patchVerifyTelegramUserAPI, {tid, handle})
//   res.status(data.status.code).json(data);
// };

// interface PatchVerifyTelegramUserAPIResponse {
//   tid: string;
//   handle: string;
//   telegram: { [k: string]: string };
// }

// export const patchVerifyTelegramUserAPI = async ({user, tid, handle}: {
//   user: Page,
//   tid: string,
//   handle: string
// }): Promise<APIResponse<PatchVerifyTelegramUserAPIResponse>> => {
//   const notion = new Client({ auth: process.env.NOTION_API_KEY });

//   const content: { [k: string]: string } = JSON.parse(
//     (user.properties["Telegram"] as RichTextPropertyValue).rich_text[0]
//       ?.plain_text || "{}"
//   );
//   const nonce = crypto.randomBytes(16).toString("base64");
//   content[`*${tid}_${handle}`] = crypto
//     .createHash("sha256")
//     .update(`${nonce}${tid}`)
//     .digest("base64");

//   const updRes = await notion.pages.update({
//     page_id: user.id,
//     properties: {
//       Telegram: {
//         type: "rich_text",
//         rich_text: [
//           {
//             type: "text",
//             text: {
//               content: JSON.stringify(content),
//             },
//           },
//         ],
//       },
//     },
//   });

//   return {
//     status: HTTPStatusCode._200,
//     data: {
//       tid: tid,
//       handle: handle,
//       telegram: JSON.parse(
//         (updRes.properties["Telegram"] as RichTextPropertyValue).rich_text[0]
//           ?.plain_text || "{}"
//       ),
//     },
//   };
// };
