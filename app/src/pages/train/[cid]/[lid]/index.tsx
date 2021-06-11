import { Box } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import {
  Assignment,
  getAssignmentsAPI,
} from "../../../api/v1/train/assignment";

export default function CoursePage({
  assignments,
}: {
  assignments: Assignment[];
}) {
  console.log(assignments);
  return (
    <Box>
      {assignments.map((a) => (
        <Link key={a.aid} shallow href={a.path}>
          {a.aid}
        </Link>
      ))}
    </Box>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { cid, lid, a } = ctx.params as { [k: string]: string };

  return {
    props: { assignments: await getAssignmentsAPI(cid, lid) },
  };
}
