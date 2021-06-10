import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../../../services/train";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cid } = req.query as { [key: string]: string };
  res.status(200).json(await getLessonsAPI(cid));
};

export interface Lesson {
  cid: string;
  lid: string;
  title: string;
  path: string;
}

export const getLessonsAPI = async (cid: string): Promise<Lesson[]> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train/${cid}`,
  });
  return Array.from(res.data as OctokitRepoContentDataType, (e) => {
    const ss = e.path.split("/");
    return {
      cid: ss[2],
      lid: ss[3],
      title: ss[3].split("_")[1],
      path: e.path.slice("data".length),
    };
  });
};
