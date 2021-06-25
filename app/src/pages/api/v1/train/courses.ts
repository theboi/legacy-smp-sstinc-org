import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
  Course,
  CourseSubject,
} from "../../../../typings/train";
import { handleAuth } from "../../../../utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await handleAuth(req, getTrainAPI);
  res.status(data.status.code).json(data.data);
};

export const getTrainAPI = async (): Promise<APIResponse<Course[]>> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train`,
  });

  return {
    status: HTTPStatusCode._200,
    data: Array.from(
      res.data as OctokitRepoContentDataType,
      (e): Course => ({
        cid: e.name,
        subject: CourseSubject[e.name],
        cpath: e.path.slice("data".length),
      })
    ),
  };
};
