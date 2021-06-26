import { Client } from "@notionhq/client/build/src";
import {
  URLPropertyValue,
  TitlePropertyValue,
  RichTextPropertyValue,
  CheckboxPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import getNotionAPIKey from "../../../../utils/api/getNotionAPIKey";
import { handleAuth } from "../../../../utils/api/handleAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [k: string]: string };
  const data = await handleAuth(req, getURLAPI, { slug });
  res.status(data.status).json(data.data);
};

interface GetURLAPIResponse {
  suffix: string;
  description: string;
  url: string;
  authorName: string;
  authorIID: string;
  isLocked: boolean;
}

export const getURLAPI = async ({
  slug,
  notion = new Client({ auth: getNotionAPIKey() }),
}: {
  slug: string;
  notion?: Client;
}): Promise<APIResponse<GetURLAPIResponse>> => {
  if (slug[0] === "@") slug = slug.slice(1);
  const res = await notion.databases.query({
    database_id: "3e52639bf59748c8af9cc687df1b90da",
    filter: {
      property: "Suffix",
      text: {
        equals: slug,
      },
    },
  });

  if (res.results.length === 0) return { status: HTTPStatusCode.NotFound };
  else if (res.results.length > 1)
    return { status: HTTPStatusCode.MultipleChoice };

  const record = res.results[0];
  return {
    status: HTTPStatusCode.OK,
    data: {
      suffix:
        (record.properties["Suffix"] as TitlePropertyValue)?.title[0]
          ?.plain_text ?? "",
      description:
        (record.properties["Description"] as RichTextPropertyValue)
          ?.rich_text[0]?.plain_text ?? "",
      url: (record.properties["URL"] as URLPropertyValue)?.url ?? "",
      authorName:
        (record.properties["Author Name"] as RichTextPropertyValue)
          ?.rich_text[0]?.plain_text ?? "",
      authorIID:
        (record.properties["Author Inc ID"] as RichTextPropertyValue)
          ?.rich_text[0]?.plain_text ?? "",
      isLocked:
        (record.properties["Is Locked"] as CheckboxPropertyValue)?.checkbox ??
        false,
    },
  };
};
