import { Box } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Course } from "../../../typings/train";
import { getCourseAPI } from "../../api/v1/train/course";

export default function CoursePage({ course }: { course: Course }) {
  return (
    <Box>
      {course.lessons?.map((l) => (
        <Link key={l.lid} href={l.lpath}>
          {l.lid}
        </Link>
      ))}
    </Box>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { cid } = ctx.params as { [k: string]: string };

  return {
    props: { course: (await getCourseAPI({ cid })).data },
  };
}
