import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import getNotionAPIKey from "../../../../utils/api/getNotionAPIKey";
import { getFirebaseToken } from "../../../../utils/api/handleAuth";

export interface PostSignUpAPIResponse {}

export interface PostSignUpAPIBody {
  handle: string;
  name: string;
  email: string;
  firebase: string;
  photoURL: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as PostSignUpAPIBody;
  const notion = new Client({ auth: getNotionAPIKey() });
  const auth = req.headers.authorization;
  const data = await postSignUpAPI({ auth, body, notion });
  res.status(data.status).json(data.data);
};

export const postSignUpAPI = async ({
  auth,
  body,
  notion,
}: {
  auth: string;
  body: PostSignUpAPIBody;
  notion: Client;
}): Promise<APIResponse<PostSignUpAPIResponse>> => {
  if (!auth.startsWith("Token")) return { status: HTTPStatusCode.Unauthorized };

  const res = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
    filter: {
      property: "Email",
      text: {
        equals: body.email,
      },
    },
  });

  if (res.results.length === 0) return { status: HTTPStatusCode.Forbidden };
  else if (res.results.length > 1)
    return { status: HTTPStatusCode.MultipleChoice };

  const token = await getFirebaseToken(auth.split(" ")[1]);
  if (token.email_verified && token.email === body.email) {
    const upd = await notion.pages.update({
      page_id: res.results[0].id,
      properties: {
        Firebase: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: token.uid,
              },
            },
          ],
        },
        Handle: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body.handle,
              },
            },
          ],
        },
        "Photo URL": {
          type: "url",
          url: body.photoURL,
        },
        Name: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body.name,
              },
            },
          ],
        },
      },
    });

    return {
      status: HTTPStatusCode.OK,
    };
  }

  return { status: HTTPStatusCode.Unauthorized };
};
