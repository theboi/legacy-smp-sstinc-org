import {
  Page,
  URLPropertyValue,
  EmailPropertyValue,
  NumberPropertyValue,
  TitlePropertyValue,
  RichTextPropertyValue,
  SelectPropertyValue,
} from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { AuthUser, UserRank, UserRole } from "../../../../typings/user";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { handleAuth } from "../../../../utils/api/handleAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await handleAuth(req, getAuthUserAPI);
  res.status(data.status).json(data.data);
};

type GetAuthUserAPIResponse = AuthUser;

export const getAuthUserAPI = async ({
  user,
}: {
  user: Page;
}): Promise<APIResponse<GetAuthUserAPIResponse>> => {
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
      email: (user.properties["Email"] as EmailPropertyValue)?.email ?? "",
      batch: (user.properties["Points"] as NumberPropertyValue)?.number ?? 0,
      firebaseId:
        (user.properties["Firebase"] as RichTextPropertyValue)?.rich_text[0]
          .plain_text ?? "",
      telegramId:
        (user.properties["Telegram"] as RichTextPropertyValue)?.rich_text[0]
          .plain_text ?? "",
    },
  };
};
