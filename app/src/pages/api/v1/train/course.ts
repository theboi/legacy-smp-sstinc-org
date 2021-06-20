import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../../../services/train";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { Course, CourseSubject, Lesson } from "../../../../typings/train";
import { handleAuth } from "../../../../utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cid } = req.query as { [k: string]: string };
  res.status(200).json(await handleAuth(req, getCourseAPI, { cid }));
};

export const getCourseAPI = async ({
  cid,
}: {
  cid: string;
}): Promise<APIResponse<Course>> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train/${cid}`,
  });
  const cpath = `/train/${cid}`;

  return {
    status: HTTPStatusCode._200,
    data: {
      cid: cid,
      subject: CourseSubject[cid],
      cpath: cpath,
      lessons: Array.from(
        res.data as OctokitRepoContentDataType,
        (e): Lesson => {
          const ss = e.path.split("/");
          return {
            cid: ss[2],
            lid: ss[3],
            title: ss[3].split("_")[1],
            lpath: e.path.slice("data".length),
            cpath: cpath,
          };
        }
      ),
    },
  };
};
