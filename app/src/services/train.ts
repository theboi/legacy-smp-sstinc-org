import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { Dispatch, SetStateAction, useState } from "react";

// https://docs.github.com/en/rest/reference/repos#get-repository-content
const getRepoContentPath = "GET /repos/{owner}/{repo}/contents/{path}";
const getCommits = "GET /repos/{owner}/{repo}/commits";

const octokit = new Octokit();

// const res = await octokit.request(getCommits, {
//   owner: "theboi",
//   repo: "smp-sstinc-org",
//   path: ``,
//   per_page: 1
// });

type SetCourseType = Dispatch<SetStateAction<{ [cid: string]: Course }>>;
type OctokitRepoContentDataType =
  Endpoints[typeof getRepoContentPath]["response"]["data"] & {
    length: number /* Octokit typing missing length property */;
  };

function useTrain() {
  const [courses, setCourse] = useState<{ [cid: string]: Course }>();

  const getCourses = (): Course[] => {
    if (courses === undefined) {
      (async () => {
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
      })();
    }
    return Object.values(courses ?? {});
  };

  return getCourses();
}

enum CourseSubject {
  ios = "iOS",
  and = "Android",
  rct = "React",
}

class Course {
  setCourse: SetCourseType;
  readonly cid: string;
  #lessons: { [lid: string]: Lesson };

  set lessons(v: { [lid: string]: Lesson }) {
    this.#lessons = v;
  }

  get lessons(): { [lid: string]: Lesson } {
    if (this.#lessons === undefined) {
      (async () => {
        const res = await octokit.request(getRepoContentPath, {
          owner: "theboi",
          repo: "smp-sstinc-org",
          path: `/data/train/${this.cid}`,
        });
        const data = Object.fromEntries(
          Array.from(
            res.data as OctokitRepoContentDataType,
            (e) => new Lesson(this.setCourse, this.cid, e.name)
          ).map((d) => [d.lid, d])
        );

        this.setCourse((c) => {
          const n = Object.assign(Object.create(Object.getPrototypeOf(c)), c);
          n[this.cid].#lessons = data;
          return n;
        });
      })();
    }

    return this.#lessons ?? {};
  }

  get subject(): CourseSubject {
    return CourseSubject[this.cid];
  }

  constructor(setCourse: SetCourseType, cid: string) {
    this.setCourse = setCourse;
    this.cid = cid;
  }
}

class Lesson {
  setCourse: SetCourseType;
  readonly cid: string;
  readonly lid: string;
  #assignments: { [aid: string]: Assignment };

  set assignments(v: { [aid: string]: Assignment }) {
    this.#assignments = v;
  }

  get assignments(): { [aid: string]: Assignment } {
    if (this.#assignments === undefined) {
      (async () => {
        const res = await octokit.request(getRepoContentPath, {
          owner: "theboi",
          repo: "smp-sstinc-org",
          path: `/data/train/${this.cid}/${this.lid}`,
        });
        const data = Object.fromEntries(
          Array.from(
            res.data as OctokitRepoContentDataType,
            (e) =>
              new Assignment(
                this.setCourse,
                this.cid,
                this.lid,
                e.name,
                e.download_url
              )
          ).map((d) => [d.aid, d])
        );

        this.setCourse((c) => {
          const n = Object.assign(Object.create(Object.getPrototypeOf(c)), c);
          n[this.cid].lessons[this.lid].#assignments = data;
          return n;
        });
      })();
    }

    return this.#assignments ?? {};
  }

  get title(): string {
    return this.lid.split("_")[1];
  }

  constructor(setCourse: SetCourseType, cid: string, lid: string) {
    this.setCourse = setCourse;
    this.cid = cid;
    this.lid = lid;
  }
}

enum AssignmentType {
  sld = "slides",
  qui = "quiz",
  art = "article",
}

class Assignment {
  setCourse: SetCourseType;
  readonly cid: string;
  readonly lid: string;
  readonly aid: string; // also the file name including extension
  readonly url: string;
  #content: string;

  set content(v: string) {
    this.#content = v;
  }

  get content(): string {
    if (this.#content === undefined) {
      (async () => {
        const res = await octokit.request("GET {url}", {
          url: this.url,
        });

        this.setCourse((c) => {
          const n = Object.assign(Object.create(Object.getPrototypeOf(c)), c);
          n[this.cid].lessons[this.lid].assignments[this.aid].#content =
            res.data;
          return n;
        });
      })();
    }

    return this.#content ?? "";
  }

  get title(): string {
    return this.aid.split("_")[1];
  }

  get type(): AssignmentType {
    console.log("hi", this.aid.split(".")[1]);
    return AssignmentType[this.aid.split(".")[1]];
  }

  constructor(
    setCourse: SetCourseType,
    cid: string,
    lid: string,
    aid: string,
    url: string
  ) {
    this.setCourse = setCourse;
    this.cid = cid;
    this.lid = lid;
    this.aid = aid;
    this.url = url;
  }
}

export { useTrain, Course, CourseSubject, Lesson, Assignment, AssignmentType };
