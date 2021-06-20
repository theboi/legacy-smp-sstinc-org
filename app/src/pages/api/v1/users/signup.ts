import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse } from "../../../../typings/api";
import { getNotionAPIKey, handleAuth } from "../../../../utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [k: string]: string };
  res.status(200).json(await handleAuth(req, postUserSignUpAPI, { slug }));
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

  return response.results[0];
};
