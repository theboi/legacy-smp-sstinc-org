import {
  Avatar,
  Box,
  HStack,
  Image,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { getCoursesAPI, Course } from "../api/v1/train/course";
import NextLink from "next/link";

export default function TrainPage({ courses }: { courses: Course[] }) {
  return (
    <Box>
      {courses.map((c) => (
        <LinkBox
          key={c.cid}
          as="article"
          maxW="sm"
          p="5"
          borderWidth="1px"
          rounded="md"
        >
          <NextLink href={c.path}>
            <LinkOverlay href={c.path}>
              <HStack>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={`/assets/train/${c.cid}.png`}
                  alt={c.name}
                />
                <Text>{c.name}</Text>
              </HStack>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      ))}
    </Box>
  );
  // const [index, setIndex] = useState(0);
  // const [assignment, setAssignment] = useState<Assignment>();

  // const [courses, setCourse] = useStateWithCallback<{ [cid: string]: Course }>(
  //   undefined,
  //   () => {
  //     if (courses === undefined) TrainProvider.getCourses(setCourse);
  //   }
  // );

  // return (
  //   <div>
  //     <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
  //       <Box style={{ flexBasis: 300, flexGrow: 1 }}>
  //         <AtdField />
  //         <Box>
  //           <CourseDropdown
  //             index={index}
  //             setIndex={setIndex}
  //             courses={Object.values(courses ?? {})}
  //           />
  //           <TrainingSelectBar
  //             lessons={Object.values(
  //               Object.values(courses ?? {})[index]?.lessons ?? {}
  //             )}
  //             assignment={assignment}
  //             setAssignment={setAssignment}
  //           />
  //         </Box>
  //       </Box>
  //       <AssignmentContent assignment={assignment} />
  //     </div>
  //   </div>
  // );
}

export async function getServerSideProps() {
  return {
    props: { courses: await getCoursesAPI() },
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

// function CourseDropdown(props: {
//   index: number;
//   setIndex: Dispatch<SetStateAction<number>>;
//   courses: Course[];
// }) {
//   return (
//     <Menu>
//       <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//         Course: {props.courses?.[props.index]?.subject}
//       </MenuButton>
//       <MenuList>
//         {props.courses.map((e, i) => (
//           <MenuItem key={i} minH="48px" onClick={() => props.setIndex(i)}>
//             <Image
//               boxSize="2rem"
//               borderRadius="full"
//               src="https://placekitten.com/100/100"
//               alt="Fluffybuns the destroyer"
//               mr="12px"
//             />
//             <span>{e.subject}</span>
//           </MenuItem>
//         ))}
//       </MenuList>
//     </Menu>
//   );
// }
