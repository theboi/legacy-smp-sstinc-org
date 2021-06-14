export const CourseSubject = {
  ios: "iOS",
  and: "Android",
  rct: "React",
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
