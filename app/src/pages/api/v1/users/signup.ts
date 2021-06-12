import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [key: string]: string };
  res.status(200).json(await putUserSignUp(slug));
};

export const putUserSignUp = async (slug: string): Promise<Page> => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
  });

  return response.results[0];
};
