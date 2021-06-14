import { Client } from "@notionhq/client";
import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = "18fa1d9bdfb6443a82ab48012655d5ef";
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();
