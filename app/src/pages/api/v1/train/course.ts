import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../../../services/train";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await getCoursesAPI());
};

export interface Course {
  cid: string;
  name: string;
  path: string;
}

const courseNames = {
  ios: "iOS",
  and: "Android",
  rct: "React",
};

export const getCoursesAPI = async (): Promise<Course[]> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train`,
  });

  return Array.from(res.data as OctokitRepoContentDataType, (e) => ({
    cid: e.name,
    name: courseNames[e.name],
    path: e.path.slice("data".length),
  }));
};
