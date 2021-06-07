import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { Assignment, Course, Lesson, SetCourseType } from "../../objects/train";

// https://docs.github.com/en/rest/reference/repos#get-repository-content
export const getRepoContentPath = "GET /repos/{owner}/{repo}/contents/{path}";
export const getCommits = "GET /repos/{owner}/{repo}/commits";

const octokit = new Octokit();

// const res = await octokit.request(getCommits, {
//   owner: "theboi",
//   repo: "smp-sstinc-org",
//   path: ``,
//   per_page: 1
// });

export type OctokitRepoContentDataType =
  Endpoints[typeof getRepoContentPath]["response"]["data"] & {
    length: number /* Octokit typing missing length property */;
  };

class TrainProvider {
  static async getCourses(setCourse: SetCourseType) {
    const res = await octokit.request(getRepoContentPath, {
      owner: "theboi",
      repo: "smp-sstinc-org",
      path: `/data/train`,
    });
    const data = Object.fromEntries(
      Array.from(
        res.data as OctokitRepoContentDataType,
        (e) => new Course(setCourse, e.name)
      ).map((d) => [d.cid, d])
    );
    setCourse(data);
  }

  static async getLessons(setCourse: SetCourseType, cid: string) {
    const res = await octokit.request(getRepoContentPath, {
      owner: "theboi",
      repo: "smp-sstinc-org",
      path: `/data/train/${cid}`,
    });
    const data = Object.fromEntries(
      Array.from(
        res.data as OctokitRepoContentDataType,
        (e) => new Lesson(setCourse, cid, e.name)
      ).map((d) => [d.lid, d])
    );

    setCourse((c) => {
      const n: { [cid: string]: Course } = Object.assign(
        Object.create(Object.getPrototypeOf(c)),
        c
      );
      n[cid].lessons = data;
      return n;
    });
  }

  static async getAssignments(
    setCourse: SetCourseType,
    cid: string,
    lid: string
  ) {
    const res = await octokit.request(getRepoContentPath, {
      owner: "theboi",
      repo: "smp-sstinc-org",
      path: `/data/train/${cid}/${lid}`,
    });
    const data = Object.fromEntries(
      Array.from(
        res.data as OctokitRepoContentDataType,
        (e) => new Assignment(setCourse, cid, lid, e.name, e.download_url)
      ).map((d) => [d.aid, d])
    );

    setCourse((c) => {
      const n = Object.assign(Object.create(Object.getPrototypeOf(c)), c);
      n[cid].lessons[lid].assignments = data;
      return n;
    });
  }

  static async getContent(
    setCourse: SetCourseType,
    cid: string,
    lid: string,
    aid: string,
    url: string
  ) {
    const res = await octokit.request("GET {url}", {
      url: url,
    });

    setCourse((c) => {
      const n = Object.assign(Object.create(Object.getPrototypeOf(c)), c);
      n[cid].lessons[lid].assignments[aid].content = res.data;
      return n;
    });
  }
}

export { TrainProvider };
