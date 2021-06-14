import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../../../services/train";
import { Course, CourseSubject } from "../../../../typings/train";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await getTrainAPI());
};

export const getTrainAPI = async (): Promise<Course[]> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train`,
  });

  return Array.from(
    res.data as OctokitRepoContentDataType,
    (e): Course => ({
      cid: e.name,
      subject: CourseSubject[e.name],
      cpath: e.path.slice("data".length),
    })
  );
};
