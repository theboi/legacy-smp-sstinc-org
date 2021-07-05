import {
  Box,
  Button,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { LinkButton } from "../../../components/theme/linkButton";
import { Assignment, Course } from "../../../typings/train";
import { getCourseAPI } from "../../api/v1/train/course";

export default function CoursePage({ course }: { course: Course }) {
  // (
  //   <Link key={l.lid} href={l.lpath}>
  //         {l.lid}
  //       </Link>
  // )
  return (
    <Box>
      <Accordion allowToggle>
        {course.lessons?.map((l) => (
          <AccordionItem key={l.lid}>
            <AccordionButton
              style={{ borderRadius: "var(--chakra-radii-md)" }}
              _expanded={{
                color: "var(--chakra-colors-blue-200)",
                bg: "#90cdf422",
              }}
            >
              <Box flex="1" textAlign="left">
                {l.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              sx={{ display: "flex", flexDir: "column", gap: 10 }}
            >
              <Heading size="md">Content</Heading>
              <UnorderedList>
                {/* {l.assignments.map((a: Assignment) => (
                <ListItem>{a.title}</ListItem>
              ))} */}
              </UnorderedList>
              <LinkButton
                customButton={<Button colorScheme="blue" />}
                href={l.lpath}
              >
                Open Lesson
              </LinkButton>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { cid } = ctx.params as { [k: string]: string };

  return {
    props: { course: (await getCourseAPI({ cid })).data },
  };
}
