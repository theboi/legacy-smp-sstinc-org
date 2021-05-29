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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../model/user";
import { Lesson, useLearn } from "../../services/learn";
import AtdField from "../../components/atd";
import { useColor } from "../../extensions/chakra";

export default function TrainPage(props: { user: User }) {
  const [vocInd, setVocInd] = useState(0);
  const [currentDid, setCurrentDid] = useState("");
  const courses = useLearn();

  const courseDropdown = (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Course: {courses[vocInd]?.subject}
      </MenuButton>
      <MenuList>
        {courses.map((e, i) => (
          <MenuItem minH="48px" onClick={() => setVocInd(i)}>
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
          <TrainingSelectBar
            lessons={Object.values(courses[vocInd]?.lessons ?? {})}
            currentAid={currentDid}
            setCurrentAid={setCurrentDid}
          />
        </div>
        <TheatreLessonContent />
      </div>
    </div>
  );
}

function TrainingSelectBar(props: {
  lessons: Lesson[];
  currentAid: string;
  setCurrentAid: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Accordion allowToggle>
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
          {Object.values(l.assignments ?? {}).map((a) => (
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
    </Accordion>
  );
}

function TheatreLessonContent() {
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
