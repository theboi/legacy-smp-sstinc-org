import { Client } from "@notionhq/client";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query as { [key: string]: string };
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: "c460fd270be44858a74395684f6e6897",
    filter:
      user === "all"
        ? undefined
        : {
            property: "Email",
            text: {
              equals: user,
            },
          },
  });
  const data = user === "all" ? response.results : response.results[0];

  res.status(200).json(data);
};
