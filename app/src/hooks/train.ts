import { useState } from "react";
import { TrainProvider } from "../providers/train";
import { Course } from "../services/train";

function useTrain() {
  const [courses, setCourse] = useState<{ [cid: string]: Course }>();

  const getCourses = (): Course[] => {
    if (courses === undefined) TrainProvider.getCourses(setCourse);
    return Object.values(courses ?? {});
  };

  return getCourses();
}

export { useTrain };
