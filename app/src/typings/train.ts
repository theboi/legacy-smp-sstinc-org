import { Endpoints } from "@octokit/types";

// https://docs.github.com/en/rest/reference/repos#get-repository-content
export const getRepoContentPath = "GET /repos/{owner}/{repo}/contents/{path}";
export const getCommits = "GET /repos/{owner}/{repo}/commits";

export type OctokitRepoContentDataType =
  Endpoints[typeof getRepoContentPath]["response"]["data"] & {
    length: number /* Octokit typing missing length property */;
  };

export const CourseSubject = {
  ios: "iOS",
  and: "Android",
  rct: "React",
  rcn: "React Native",
};

export interface Course {
  cid: string;
  subject: string;
  cpath: string;
  lessons?: Lesson[];
}

export interface Lesson {
  cid: string;
  lid: string;
  title: string;
  lpath: string;
  cpath: string;
  assignments?: Assignment[];
}

export const AssignmentType = {
  sld: "slides",
  qui: "quiz",
  art: "article",
};

export interface Assignment {
  cid: string;
  lid: string;
  aid: string;
  title: string;
  url: string;
  type: string;
  path: string;
}
