import { Client } from "@notionhq/client/build/src";
import {
  Page,
  RichTextPropertyValue,
  TitlePropertyValue,
  EmailPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { handleAuth } from "../../../../utils/api/handleAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tid, handle } = req.query as { [k: string]: string };
  const data = await handleAuth(req, postAttendanceRecordAPI, {
    tid,
    handle,
  });
  res.status(data.status.code).json(data.data);
};

interface PostAttendanceRecordAPIResponse {}

export const postAttendanceRecordAPI = async ({
  user,
  notion,
}: {
  user: Page;
  notion: Client;
}): Promise<APIResponse<PostAttendanceRecordAPIResponse>> => {
  const response = await notion.pages.create({
    parent: {
      database_id: "448525b688ac4f0597210ebec4e53557",
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
      // User: {
      //   type: "relation",
      //   relation: [
      //     {
      //       id: user.id
      //     }
      //   ]
      // }
    },
  });

  return {
    status: HTTPStatusCode._200,
    data: {},
  };
};
