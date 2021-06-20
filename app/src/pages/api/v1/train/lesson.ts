import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../../../services/train";
import { APIResponse, HTTPStatusCode } from "../../../../typings/api";
import { Assignment, AssignmentType, Lesson } from "../../../../typings/train";
import { handleAuth } from "../../../../utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cid, lid } = req.query as { [k: string]: string };
  res.status(200).json(await handleAuth(req, getLessonAPI, { cid, lid }));
};

export const getLessonAPI = async ({
  cid,
  lid,
}: {
  cid: string;
  lid: string;
}): Promise<APIResponse<Lesson>> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train/${cid}/${lid}`,
  });
  return {
    status: HTTPStatusCode._200,
    data: {
      cid: cid,
      lid: lid,
      title: lid.split("_")[1],
      lpath: `/train/${cid}/${lid}`,
      cpath: `/train/${cid}`,
      assignments: Array.from(
        res.data as OctokitRepoContentDataType,
        (e): Assignment => {
          const ss = e.path.split("/");
          const pas = e.path.slice("data".length).split("/");

          return {
            cid: ss[2],
            lid: ss[3],
            aid: ss[4],
            title: ss[4].split("_")[1].split(".")[0],
            url: e.download_url,
            type: AssignmentType[e.path.split(".")[1]] ?? AssignmentType.art,
            path:
              "/" + pas.slice(1, -1).join("/") + "?a=" + pas[pas.length - 1],
          };
        }
      ),
    },
  };
};
