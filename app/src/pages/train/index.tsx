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
  Center,
  Heading,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../services/userold";
import { Assignment, Course, Lesson } from "../../services/train";
import AtdField from "../../components/atd";
import AssignmentContent from "../../components/train/assignmentContent";
import { useTrain } from "../../hooks/train";

export default function TrainPage(props: { user: User }) {
  const [index, setIndex] = useState(0);
  const [assignment, setAssignment] = useState<Assignment>();
  const courses = useTrain();

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <div style={{ flexBasis: 300, flexGrow: 1 }}>
          <AtdField user={props.user} />
          <CourseDropdown index={index} setIndex={setIndex} courses={courses} />
          <TrainingSelectBar
            lessons={Object.values(courses[index]?.lessons ?? {})}
            assignment={assignment}
            setAssignment={setAssignment}
          />
        </div>
        <AssignmentContent assignment={assignment} />
      </div>
    </div>
  );
}

function TrainingSelectBar(props: {
  lessons: Lesson[];
  assignment: Assignment;
  setAssignment: Dispatch<SetStateAction<Assignment>>;
}) {
  return (
    <Accordion allowToggle>
      {props.lessons.map((l) => (
        <AccordionItem key={l.lid}>
          <h2>
            <AccordionButton
              onClick={() => props.setAssignment(null)}
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
          {Object.values(l.assignments ?? {}).map((a) => (
            <AccordionPanel
              onClick={() => props.setAssignment(a)}
              key={a.aid}
              pb={4}
              pl={10}
              style={
                props.assignment?.aid === a.aid
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
    </Accordion>
  );
}

function CourseDropdown(props: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  courses: Course[];
}) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Course: {props.courses[props.index]?.subject}
      </MenuButton>
      <MenuList>
        {props.courses.map((e, i) => (
          <MenuItem key={i} minH="48px" onClick={() => props.setIndex(i)}>
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
}
