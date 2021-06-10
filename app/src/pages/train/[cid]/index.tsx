import { Box } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { getLessonsAPI, Lesson } from "../../api/v1/train/lesson";

export default function CoursePage({ lessons }: { lessons: Lesson[] }) {
  console.log(lessons);
  return (
    <Box>
      {lessons.map((l) => (
        <Link key={l.lid} href={l.path}>
          {l.lid}
        </Link>
      ))}
    </Box>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { cid } = ctx.params as { [k: string]: string };

  return {
    props: { lessons: await getLessonsAPI(cid) },
  };
}
