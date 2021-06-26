import { Client } from "@notionhq/client/build/src";
import {
  Page,
  URLPropertyValue,
  NumberPropertyValue,
  TitlePropertyValue,
  RichTextPropertyValue,
  SelectPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { User, UserRank, UserRole } from "../../../../typings/user";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { handleAuth } from "../../../../utils/api/handleAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [k: string]: string };
  const data = await handleAuth(req, getUserAPI, { slug });
  res.status(data.status).json(data.data);
};

type GetUserAPIResponse = User;

export const getUserAPI = async ({
  slug,
  notion,
}: {
  slug: string;
  notion: Client;
}): Promise<APIResponse<GetUserAPIResponse>> => {
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
  const res = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
    filter: {
      property: pn,
      text: {
        equals: slug,
      },
    },
  });

  if (res.results.length === 0) return { status: HTTPStatusCode.NotFound };
  else if (res.results.length > 1)
    return { status: HTTPStatusCode.MultipleChoice };

  const user = res.results[0];
  console.log(user);
  return {
    status: HTTPStatusCode.OK,
    data: {
      iid:
        (user.properties["Inc ID"] as TitlePropertyValue)?.title[0]
          .plain_text ?? "",
      name:
        (user.properties["Name"] as RichTextPropertyValue)?.rich_text[0]
          .plain_text ?? "",
      handle:
        (user.properties["Handle"] as RichTextPropertyValue)?.rich_text[0]
          .plain_text ?? "",
      rank: UserRank[
        (user.properties["Rank"] as SelectPropertyValue)?.select.name ?? "None"
      ],
      role: UserRole[
        (user.properties["Role"] as SelectPropertyValue)?.select.name ?? "None"
      ],
      points: (user.properties["Points"] as NumberPropertyValue)?.number ?? 0,
      photoURL: (user.properties["Photo URL"] as URLPropertyValue)?.url ?? "",
    },
  };
};
