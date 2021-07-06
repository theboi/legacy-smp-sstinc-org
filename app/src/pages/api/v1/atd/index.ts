import { Client } from "@notionhq/client/build/src";
import hash from "crypto-js/sha256";
import {
  Page,
  RichTextPropertyValue,
  TitlePropertyValue,
  EmailPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { handleAuth } from "../../../../utils/api/handleAuth";

export interface PostAttendanceRecordAPIResponse {
  status: string;
}

export interface PostAttendanceRecordAPIBody {
  code: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body as PostAttendanceRecordAPIBody;
  const data = await handleAuth(req, postAttendanceRecordAPI, {
    code,
  });
  res.status(data.status).json(data.data);
};

export const postAttendanceRecordAPI = async ({
  user,
  notion,
  code,
}: {
  user: Page;
  notion: Client;
  code: string;
}): Promise<APIResponse<PostAttendanceRecordAPIResponse>> => {
  function getKeyCode(offset: number = 0) {
    const epochSeconds = (new Date().getTime() + offset) / 1000;
    return hash(`sstinc${epochSeconds - (epochSeconds % 20)}`)
      .toString()
      .slice(0, 4)
      .toUpperCase();
  }

  if (code !== getKeyCode() && code !== getKeyCode(20000)) {
    return {
      status: HTTPStatusCode.OK,
      data: {
        status: "Invalid",
      },
    };
  }

  const response = await notion.pages.create({
    parent: {
      database_id: "79df706a109546f798e74c0105752329",
    },
    properties: {
      "Inc ID": {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: (user.properties["Inc ID"] as TitlePropertyValue)
                ?.title[0]?.plain_text,
            },
          },
        ],
      },
      Name: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: (user.properties["Name"] as RichTextPropertyValue)
                ?.rich_text[0]?.plain_text,
            },
          },
        ],
      },
      Email: {
        type: "email",
        email: (user.properties["Email"] as EmailPropertyValue)?.email,
      },
      User: {
        // @ts-ignore-next Notion bug
        type: "relation",
        relation: [
          {
            id: user.id,
          },
        ],
      },
    },
  });

  return {
    status: HTTPStatusCode.OK,
    data: {
      status: "Success",
    },
  };
};
