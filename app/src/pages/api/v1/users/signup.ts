import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { handleAuth } from "../../../../utils/api/handleAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [k: string]: string };
  const data = await handleAuth(req, postUserSignUpAPI, { slug });
  res.status(data.status).json(data.data);
};

export const postUserSignUpAPI = async ({
  slug,
  notion,
}: {
  slug: string;
  notion: Client;
}): Promise<APIResponse<Page>> => {
  const response = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
  });

  return {
    status: HTTPStatusCode.OK,
    data: response.results[0],
  };
};
