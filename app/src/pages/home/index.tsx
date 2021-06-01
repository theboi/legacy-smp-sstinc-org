import {
  Heading,
  Box,
  Center,
  Image,
  HStack,
  Stack,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";

const HomePage = () => {
  return (
    <Box>
      <Header />
    </Box>
  );
};

const Header = () => {
  return (
    <Box mt={2} mb={20}>
      <Center>
        <Box>
          <Box mb={5}>
            <Text fontSize={"4xl"}>
              <b>SST Inc. Management Platform</b>
            </Text>
            <Text fontSize={"2xl"}>Manage, Learn, Develop</Text>
          </Box>
          <Stack direction={"row"} spacing={7}>
            <NextLink href={"/train"}>
              <ChakraLink
                to={"/train"}
                backgroundColor="teal"
                as={Button}
                size={"md"}
              >
                Attendance & Learn
              </ChakraLink>
            </NextLink>
            <NextLink href={"/home"}>
              <ChakraLink
                to={"/account/signup"}
                backgroundColor="signUpRed"
                as={Button}
                size={"md"}
              >
                Sign Up
              </ChakraLink>
            </NextLink>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
};

const Body = () => {
  const content = [
    {
      id: 1,
      img: "https://placekitten.com/300/300",
      imgAlt: "Kitten",
      title: "Placeholder",
      desc: "Placeholder Description",
    },
  ];
  return (
    <Box>
      {content.map((bodyContent) => (
        <BodyItem bodyContent={bodyContent} key={bodyContent.id} />
      ))}
    </Box>
  );
};

const BodyItem = ({ bodyContent }) => {
  return (
    <Box overflow={"hidden"} mb={"4"}>
      <HStack spacing={"50px"}>
        <Box>
          <Image
            src={bodyContent.img}
            alt={bodyContent.imgALt}
            borderRadius={"5px"}
          />
        </Box>
        <Box>
          <Heading>
            <b>{bodyContent.title}</b>
          </Heading>
          <Text fontSize={"md"}>{bodyContent.desc}</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default HomePage;
