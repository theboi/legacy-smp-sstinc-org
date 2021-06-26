import { Client } from "@notionhq/client/build/src";
import {
  Page,
  RichTextPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import crypto from "crypto";
import { handleAuth } from "../../../../utils/api/handleAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tid, handle } = req.query as { [k: string]: string };
  const data = await handleAuth(req, patchVerifyTelegramUserAPI, {
    tid,
    handle,
  });
  res.status(data.status).json(data.data);
};

interface PatchVerifyTelegramUserAPIResponse {
  tid: string;
  handle: string;
  telegram: { [k: string]: string };
}

/**
 * [PATCH] Verify database with verified Telegram Bot (tgb) user_id
 * @param tid Telegram ID obtained from telegram bot as 10 digit number
 * @param handle Telegram Handle obtained from telegram bot as "handle" (without "@")
 * @returns tid, handle, telegram
 */
export const patchVerifyTelegramUserAPI = async ({
  user,
  tid,
  handle,
  notion,
}: {
  user: Page;
  tid: string;
  handle: string;
  notion: Client;
}): Promise<APIResponse<PatchVerifyTelegramUserAPIResponse>> => {
  const content: { [k: string]: string } = JSON.parse(
    (user.properties["Telegram"] as RichTextPropertyValue).rich_text[0]
      ?.plain_text || "{}"
  );
  const nonce = crypto.randomBytes(16).toString("base64");
  content[`*${tid}_${handle}`] = crypto
    .createHash("sha256")
    .update(`${nonce}${tid}`)
    .digest("base64");

  const updRes = await notion.pages.update({
    page_id: user.id,
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
    status: HTTPStatusCode.OK,
    data: {
      tid: tid,
      handle: handle,
      telegram: JSON.parse(
        (updRes.properties["Telegram"] as RichTextPropertyValue).rich_text[0]
          ?.plain_text || "{}"
      ),
    },
  };
};
