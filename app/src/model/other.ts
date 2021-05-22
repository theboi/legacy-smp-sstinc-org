// @ts-nocheck

import { Client } from "@notionhq/client";
import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints";

export class Train {
  notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  async getVocation(vid: string): Promise<DatabasesQueryResponse> {
    return this.notion.databases.query({
      database_id: "69523d6f71514d689fa08b4bf31e30af",
      filter: {
        property: "Vocation ID",
        select: {
          equals: vid,
        },
      },
    });
  }

  async getTraining(tid: string) {
    return this.notion.blocks.children.list({
      block_id: tid, // "706c82c6-a5b0-4eda-98f0-7e482930631f",
      page_size: 50,
    });
  }

  async checkIn(code: string) {
    if (code === "")
      return this.notion.pages.create({
        parent: {
          database_id: "79df706a109546f798e74c0105752329",
        },
        properties: {
          "Inc ID": "",
        },
      });
  }
}
