import {
  Box,
  Button,
  Heading,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import useSWR from "swr";
import Link from "../../../../components/theme/link";
import { LinkButton } from "../../../../components/theme/linkButton";
import { useDesktopMediaQuery } from "../../../../hooks/mediaQuery";
import { Assignment, AssignmentType, Lesson } from "../../../../typings/train";
import { getLessonAPI } from "../../../api/v1/train/lesson";

export default function LessonPage({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const { a: selectedIndex } = router.query as { [k: string]: string };
  const isDesktop = useDesktopMediaQuery();

  return (
    <VStack align="flex-start" gap={10}>
      <LinkButton
        href={lesson.cpath}
        customButton={<Button leftIcon={<FaArrowLeft />} />}
      >
        {lesson.title}
      </LinkButton>
      <Tabs
        index={parseInt(selectedIndex) || 0}
        orientation={isDesktop ? "vertical" : "horizontal"}
        variant={"solid-rounded"}
      >
        <TabList
          sx={
            isDesktop
              ? { width: 300 }
              : { overflowX: "scroll", overflowY: "hidden" }
          }
        >
          {lesson?.assignments.map((a, i) => (
            <Link key={a.aid} href={`?a=${i}`} shallow>
              <Tab
                sx={
                  isDesktop
                    ? {
                        width: "120%",
                        display: "block",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        borderLeftRadius: 0,
                        ml: -10,
                        pl: 10,
                      }
                    : undefined
                }
              >
                {a.title}
              </Tab>
            </Link>
          ))}
        </TabList>
        <TabPanels>
          {lesson?.assignments.map((a) => (
            <TabPanel key={a.aid} ml={5}>
              <AssignmentPage assignment={a} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

const md = new MarkdownIt();

const AssignmentPage = ({ assignment }: { assignment: Assignment }) => {
  const { data } = useSWR<string>(assignment.url);

  return (
    <Skeleton isLoaded={!!data}>
      {(() => {
        switch (assignment.type) {
          case AssignmentType.art:
            return (
              <Box>
                <Heading size="2xl">{assignment.title}</Heading>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: `<md>${md.render(data ?? "No Content")}</md>`,
                  }}
                />
              </Box>
            );
        }
      })()}
    </Skeleton>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { cid, lid } = ctx.params as { [k: string]: string };

  return {
    props: { lesson: (await getLessonAPI({ cid, lid })).data },
  };
}
