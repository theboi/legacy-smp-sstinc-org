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
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LinkButton } from "../../components/theme/linkButton";
import { useColor } from "../../hooks/color";

export default function HomePage() {
  return (
    <Box>
      <Header />
      {/* <Body /> */}
    </Box>
  );
}

const Header = () => {
  return (
    <Center>
      <VStack spacing={5} align="left">
        <Box>
          <Heading size="xl">SST Inc Management Platform</Heading>
          <Text>Create. Code. Inspire.</Text>
        </Box>
        <HStack spacing={5}>
          <LinkButton href="/join" customButton={<Button colorScheme="red" />}>
            Join Now
          </LinkButton>
        </HStack>
      </VStack>
    </Center>
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
