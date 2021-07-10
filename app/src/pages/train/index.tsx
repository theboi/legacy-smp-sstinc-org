import {
  Box,
  HStack,
  VStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { getTrainAPI } from "../api/v1/train/courses";
import NextLink from "next/link";
import { Course } from "../../typings/train";
import AtdField from "../../components/atd";

export default function TrainPage({ courses }: { courses: Course[] }) {
  return (
    <HStack spacing={10}>
      <VStack>
        {courses.map((c) => (
          <LinkBox
            key={c.cid}
            as="article"
            maxW="sm"
            p="5"
            borderWidth="1px"
            rounded="md"
          >
            <NextLink href={c.cpath}>
              <LinkOverlay href={c.cpath}>
                <HStack>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={`/assets/train/${c.cid}.png`}
                    alt={c.subject}
                  />
                  <Text>{c.subject}</Text>
                </HStack>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        ))}
      </VStack>
    </HStack>
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
    props: { courses: (await getTrainAPI()).data },
  };
}

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
