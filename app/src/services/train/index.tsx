import { Endpoints } from "@octokit/types";

// https://docs.github.com/en/rest/reference/repos#get-repository-content
export const getRepoContentPath = "GET /repos/{owner}/{repo}/contents/{path}";
export const getCommits = "GET /repos/{owner}/{repo}/commits";

export type OctokitRepoContentDataType =
  Endpoints[typeof getRepoContentPath]["response"]["data"] & {
    length: number /* Octokit typing missing length property */;
  };
