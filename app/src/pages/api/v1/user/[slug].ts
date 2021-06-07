import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { [key: string]: string };
  res.status(200).json(await getUserAPI(slug));
};

export const getUserAPI = async (slug: string): Promise<Page> => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
    filter:
      slug[0] === "@"
        ? {
            property: "Handle",
            text: {
              equals: slug.slice(1),
            },
          }
        : {
            property: "Email",
            text: {
              equals: slug,
            },
          },
  });

  return response.results[0];
};
