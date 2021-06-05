import { useState } from "react";
import { TrainProvider } from "../services/train";
import { Course } from "../objects/train";

export function useTrain() {
  const [courses, setCourse] = useState<{ [cid: string]: Course }>();

  const getCourses = (): Course[] => {
    if (courses === undefined) TrainProvider.getCourses(setCourse);
    return Object.values(courses ?? {});
  };

  return getCourses();
}
