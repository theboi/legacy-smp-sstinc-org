/* eslint-disable */
import style from "./style.module.css";

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

interface GymCourse {
  name: string;
}

export default function HackPage() {
  const courses: GymCourse[] = [{ name: "iOS " }];

  return (
    <div>
      <Accordion allowToggle>
        <div className={style.main}>
          {courses.map((e, i) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {e.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{e.name}</AccordionPanel>
            </AccordionItem>
          ))}
        </div>
      </Accordion>
    </div>
  );
}
