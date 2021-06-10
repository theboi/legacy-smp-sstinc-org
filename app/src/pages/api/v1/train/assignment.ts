import { Client } from "@notionhq/client/build/src";
import { Page } from "@notionhq/client/build/src/api-types";
import { Octokit } from "@octokit/core";
import { NextApiResponse, NextApiRequest } from "next";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../../../services/train";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cid, lid } = req.query as { [key: string]: string };
  res.status(200).json(await getAssignmentsAPI(cid, lid));
};

export interface Assignment {
  cid: string;
  lid: string;
  aid: string;
  title: string;
  url: string;
  path: string;
}

const assignmentTypes = {
  sld: "slides",
  qui: "quiz",
  art: "article",
};

export const getAssignmentsAPI = async (
  cid: string,
  lid: string
): Promise<Assignment[]> => {
  const octokit = new Octokit();

  const res = await octokit.request(getRepoContentPath, {
    owner: "theboi",
    repo: "smp-sstinc-org",
    path: `/data/train/${cid}/${lid}`,
  });
  return Array.from(res.data as OctokitRepoContentDataType, (e) => {
    const ss = e.path.split("/");
    const pas = e.path.slice("data".length).split("/");

    console.log(
      "oiJIOJIO",
      "/" + pas.slice(1, -1).join("/") + "?a=" + pas[pas.length - 1]
    );
    return {
      cid: ss[2],
      lid: ss[3],
      aid: ss[4],
      title: ss[4].split("_")[1],
      url: e.download_url,
      type: assignmentTypes[e.path.split(".")[1]] ?? assignmentTypes.art,
      path: "/" + pas.slice(1, -1).join("/") + "?a=" + pas[pas.length - 1],
    };
  });
};
