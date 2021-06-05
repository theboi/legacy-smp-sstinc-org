import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import {
  OctokitRepoContentDataType,
  getRepoContentPath,
} from "../services/train";

const octokit = new Octokit();

export function useGithubRepoData(path: string) {
  const [data, setData] = useState<OctokitRepoContentDataType>();

  useEffect(() => {
    (async () => {
      const res = await octokit.request(getRepoContentPath, {
        owner: "theboi",
        repo: "smp-sstinc-org",
        path: `/data/${path}`,
      });
      setData(res.data as OctokitRepoContentDataType);
    })();
  });

  return data;
}
