import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  getRepoContentPath,
  OctokitRepoContentDataType,
} from "../../typings/train";

const octokit = new Octokit();

export const useGithubRepoData = (path: string) => {
  const [data, setData] = useState<OctokitRepoContentDataType>();

  useEffect(() => {
    (async () => {
      const res = await octokit.request(getRepoContentPath, {
        owner: "theboi",
        repo: "smp-sstinc-org",
        path: `/data${path}`,
      });
      setData(res.data as OctokitRepoContentDataType);
    })();
  }, []);

  return data;
};

export const useGithubRawData = (path: string) =>
  useSWR(
    `https://raw.githubusercontent.com/theboi/smp-sstinc-org/main/data${path}`
  );
