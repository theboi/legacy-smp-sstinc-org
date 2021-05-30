import { Dispatch, SetStateAction } from "react";
import { TrainProvider } from "../providers/train";

export type SetCourseType = Dispatch<SetStateAction<{ [cid: string]: Course }>>;

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
    if (this.#lessons === undefined)
      TrainProvider.getLessons(this.setCourse, this.cid);
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
    if (this.#assignments === undefined)
      TrainProvider.getAssignments(this.setCourse, this.cid, this.lid);
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
    if (this.#content === undefined)
      TrainProvider.getContent(
        this.setCourse,
        this.cid,
        this.lid,
        this.aid,
        this.url
      );
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

export { Course, CourseSubject, Lesson, Assignment, AssignmentType };
