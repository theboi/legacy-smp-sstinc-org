import { Heading, Box, Center, Image, HStack, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Body />
    </Box>
  );
};

const Header = () => {
  return (
    <Box my={2}>
      <Center>
        <Text fontSize={"5xl"}>Header Goes Here</Text>
      </Center>
    </Box>
  );
};

const Body = () => {
  const content = [
    {
      img: "https://placekitten.com/300/300",
      imgAlt: "Kitten",
      title: "Placeholder",
      desc: "Placeholder Description",
    },
  ];
  return (
    <Box>
      {content.map((bodyContent) => (
        <BodyItem bodyContent={bodyContent} />
      ))}
    </Box>
  );
};

const BodyItem = ({ bodyContent }) => {
  return (
    <Box borderWidth={"1px"} borderRadius="lg" overflow="hidden">
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
