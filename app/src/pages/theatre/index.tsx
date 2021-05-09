/* eslint-disable */

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  Wrap,
  WrapItem,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import AtdField from "../../components/atd";
import { useColor } from "../../extensions/chakra";

enum TheatreAssignmentType {
  None,
  Video,
  Quiz,
}

interface _TheatreAssignment {
  // type: TheatreAssignmentType;
  aid: string;
  title: string;
}

type TheatreAssignment =
  | _TheatreAssignment
  | TheatreVideoAssignment
  | TheatreQuizAssignment;

interface TheatreVideoAssignment extends _TheatreAssignment {
  media: string[];
}

interface TheatreQuizAssignment extends _TheatreAssignment {
  quiz: string;
}

interface TheatreLesson {
  lid: string;
  title: string;
  assignments: TheatreAssignment[];
}

interface TheatreCourse {
  subject: TheatreCourseSubject;
  lessons: TheatreLesson[];
}

enum TheatreCourseSubject {
  Ios = "iOS",
  Rct = "React",
  And = "Android",
  Des = "Design",
}

const courses: TheatreCourse[] = [
  {
    subject: TheatreCourseSubject.Ios,
    lessons: [
      {
        lid: "ios_001",
        title: "Introduction to Programming",
        assignments: [
          {
            aid: "ios_001_001",
            title: "Coding",
          },
          {
            aid: "ios_001_002",
            title: "Coding2",
          },
          {
            aid: "ios_001_003",
            title: "Coding3",
          },
        ],
      },
      {
        lid: "ios_002",
        title: "iOS In a Nutshell",
        assignments: [
          {
            aid: "ios_002_001",
            title: "Net",
            media: [
              "https://docs.google.com/presentation/d/1KSwnS2GOVxLefTSHNXyOC3hRmtoUzSqCbmJYtQBFhjc",
            ],
          },
        ],
      },
    ],
  },
  {
    subject: TheatreCourseSubject.Rct,
    lessons: [
      {
        lid: "rct_001",
        title: "Introduction to Programming",
        assignments: [
          {
            aid: "ios_001_001",
            title: "Coding",
            quiz: "Hello",
          },
          {
            aid: "ios_001_002",
            title: "Coding2",
            media: [
              "https://docs.google.com/presentation/d/1KSwnS2GOVxLefTSHNXyOC3hRmtoUzSqCbmJYtQBFhjc",
            ],
          },
          {
            aid: "ios_001_003",
            title: "Coding3",
            media: [
              "https://docs.google.com/presentation/d/1KSwnS2GOVxLefTSHNXyOC3hRmtoUzSqCbmJYtQBFhjc",
            ],
          },
        ],
      },
    ],
  },
];

export default function TheatrePage(props: { user: User }) {
  // const courses: TheatreLesson[] = [{ name: "iOS " }];

  const [courseInd, setCourseInd] = useState(0);
  const [currentAid, setCurrentAid] = useState("");

  const courseDropdown = (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Course: {courses[courseInd].subject}
      </MenuButton>
      <MenuList>
        {courses.map((e, i) => (
          <MenuItem minH="48px" onClick={() => setCourseInd(i)}>
            <Image
              boxSize="2rem"
              borderRadius="full"
              src="https://placekitten.com/100/100"
              alt="Fluffybuns the destroyer"
              mr="12px"
            />
            <span>{e.subject}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <div style={{ flexBasis: 300, flexGrow: 1 }}>
          <AtdField user={props.user} />
          {courseDropdown}
          <Accordion allowToggle>
            <div>
              <TheatreLessonSelectBar
                lessons={courses[courseInd].lessons}
                currentAid={currentAid}
                setCurrentAid={setCurrentAid}
              />
            </div>
          </Accordion>
        </div>
        <TheatreLessonContent />
      </div>
    </div>
  );
}

function TheatreLessonSelectBar(props: {
  lessons: TheatreLesson[];
  currentAid: string;
  setCurrentAid: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      {props.lessons.map((l) => (
        <AccordionItem key={l.lid}>
          <h2>
            <AccordionButton
              onClick={() => props.setCurrentAid(`${l.lid}_001`)}
              style={{ borderRadius: "var(--chakra-radii-md)" }}
              _expanded={{
                color: "var(--chakra-colors-teal-200)",
                bg: "rgba(48, 140, 122, 0.3)",
              }}
            >
              <Box flex="1" textAlign="left">
                {l.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {l.assignments.map((a) => (
            <AccordionPanel
              onClick={() => props.setCurrentAid(a.aid)}
              key={a.aid}
              pb={4}
              pl={10}
              style={
                props.currentAid === a.aid
                  ? {
                      color: "var(--chakra-colors-teal-200)",
                      background: "rgba(48, 140, 122, 0.3)",
                    }
                  : {}
              }
            >
              {a.title}
            </AccordionPanel>
          ))}
        </AccordionItem>
      ))}
    </div>
  );
}

function TheatreLessonContent(props: {}) {
  return (
    <Box
      style={{
        flexBasis: "50vw",
        flexGrow: 9999,
        aspectRatio: "1920/1080",
        backgroundColor: useColor("bg2"),
      }}
    >
      <Center style={{ height: "100%", flexDirection: "column" }}>
        <Heading>🤫</Heading>
        <Heading size="sm">Coming Soon...</Heading>
      </Center>
    </Box>
  );
}
