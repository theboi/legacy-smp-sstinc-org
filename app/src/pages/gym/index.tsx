import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";

interface GymCourse {
  name: string
}

export default function GymPage(props: { user: User }) {

  const courses: GymCourse[] = [
    
  ] 
  return (
    <div className={style.main}>
      {courses.map(() => {
        return <div className={style.course}>Hi</div>
      })}
    </div>
  );
}
