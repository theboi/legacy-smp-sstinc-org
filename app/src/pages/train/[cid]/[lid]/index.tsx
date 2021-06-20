import {
  Box,
  Button,
  Heading,
  Link as ChakraLink,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import useSWR from "swr";
import { LinkButton } from "../../../../components/theme/linkButton";
import { useDesktopMediaQuery } from "../../../../hooks/mediaQuery";
import { Assignment, AssignmentType, Lesson } from "../../../../typings/train";
import { getLessonAPI } from "../../../api/v1/train/lesson";

export default function LessonPage({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const { a: selectedIndex } = router.query as { [k: string]: string };
  const isDesktop = useDesktopMediaQuery();

  return (
    <Box>
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
            <NextLink key={a.aid} href={`?a=${i}`} shallow>
              <ChakraLink href={`?a=${i}`} _hover={{ textDecor: "none" }}>
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
              </ChakraLink>
            </NextLink>
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
    </Box>
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

// function TrainingSelectBar(props: {
//   lessons: Lesson[];
//   assignment: Assignment;
//   setAssignment: Dispatch<SetStateAction<Assignment>>;
// }) {
//   return (
//     <Accordion allowToggle>
//       {props.lessons.map((l) => (
//         <AccordionItem key={l.lid}>
//           <h2>
//             <AccordionButton
//               onClick={() => props.setAssignment(null)}
//               style={{ borderRadius: "var(--chakra-radii-md)" }}
//               _expanded={{
//                 color: "var(--chakra-colors-teal-200)",
//                 bg: "rgba(48, 140, 122, 0.3)",
//               }}
//             >
//               <Box flex="1" textAlign="left">
//                 {l.title}
//               </Box>
//               <AccordionIcon />
//             </AccordionButton>
//           </h2>
//           {Object.values(l.assignments ?? {}).map((a) => (
//             <AccordionPanel
//               onClick={() => props.setAssignment(a)}
//               key={a.aid}
//               pb={4}
//               pl={10}
//               style={
//                 props.assignment?.aid === a.aid
//                   ? {
//                       color: "var(--chakra-colors-teal-200)",
//                       background: "rgba(48, 140, 122, 0.3)",
//                     }
//                   : {}
//               }
//             >
//               {a.title}
//             </AccordionPanel>
//           ))}
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }
