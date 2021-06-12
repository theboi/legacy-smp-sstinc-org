import { Client } from "@notionhq/client/build/src";
import { RichTextPropertyValue } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse } from "../../../../typings/api";
import crypto from "crypto";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tid, handle, pid } = req.query as { [key: string]: string };
  const { status, data } = await patchTelegramUserAPI(tid, handle, pid);
  res.status(status).json(data);
};

interface PatchTelegramUserAPIResponse {
  tid: string;
  handle: string;
  pid: string;
  telegram: { [k: string]: string };
}

/**
 * Patches database with verified Telegram Bot (tgb) user_id
 * @param tid Telegram ID obtained from telegram bot as 10 digit number
 * @param handle Telegram Handle obtained from telegram bot as "handle" (without "@")
 * @param pid Page ID obtained from /api/v1/user/[slug]
 * @returns tid, handle, pid, telegram
 */
export const patchTelegramUserAPI = async (
  tid: string,
  handle: string,
  pid: string
): Promise<APIResponse<PatchTelegramUserAPIResponse>> => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const nonce = crypto.randomBytes(16).toString("base64");

  const retRes = await notion.pages.retrieve({ page_id: pid });
  const content: { [k: string]: string } = JSON.parse(
    (retRes.properties["Telegram"] as RichTextPropertyValue).rich_text[0]
      ?.plain_text || "{}"
  );
  content[`*${tid}_${handle}`] = crypto
    .createHash("sha256")
    .update(`${nonce}${tid}`)
    .digest("base64");

  const updRes = await notion.pages.update({
    page_id: pid,
    properties: {
      Telegram: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: JSON.stringify(content),
            },
          },
        ],
      },
    },
  });

  return {
    status: 200,
    data: {
      tid: tid,
      handle: handle,
      pid: pid,
      telegram: JSON.parse(
        (updRes.properties["Telegram"] as RichTextPropertyValue).rich_text[0]
          ?.plain_text || "{}"
      ),
    },
  };
};
