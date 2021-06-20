import { GetServerSidePropsContext } from "next";
import { provider } from "../../model/provider";
import { getUserAPI } from "../api/v1/user/[slug]";

import {
  Avatar,
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  Badge,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { LinkButton } from "../../components/theme/linkButton";
import { useUserWithHandle } from "../../hooks/users";
import { FaDownload } from "react-icons/fa";

export default function ProfilePage({ handle }: { handle: string }) {
  const { user } = useUserWithHandle(handle);
  const roles = [
    "Banned",
    "Member",
    "Trainee",
    "Employee",
    "Associate",
    "Alumni",
    "ExCo",
    "Consultant",
    "BOD",
    "Root",
  ];

  // Temporary Test Score
  const tempTestScore = [
    {
      lang: "Swift",
      year: "2021",
      score: "10",
      total: "10",
      markersComments: "Placeholder",
      dwnloadLink: "https://drive.google.com",
    },
    {
      lang: "Android",
      year: "2021",
      score: "10",
      total: "10",
      markersComments: "Placeholder",
      dwnloadLink: "https://drive.google.com",
    },
  ];

  return (
    <VStack spacing={70}>
      <HStack spacing={3}>
        <Avatar name={user?.name} src={user?.photoURL} size="2xl" />
        <VStack align="stretch">
          <HStack spacing={2}>
            <Heading>{user?.name}</Heading>
            <Badge
              colorScheme={
                roles[user?.role] == "Consultant" || roles[user?.role] == "BOD"
                  ? "red"
                  : roles[user?.role] == "ExCo"
                  ? "green"
                  : roles[user?.role] == "Root"
                  ? "purple"
                  : "default"
              }
            >
              {roles[user?.role]}
            </Badge>
          </HStack>
          <Text>@{user?.handle}</Text>
          <Text>
            <b>Points: </b>
            {user?.points}
          </Text>
        </VStack>
      </HStack>
      <Box>
        <HStack spacing={5}>
          {tempTestScore.map((testScore) => (
            <ScoreBox key={Math.random()} testScore={testScore} />
          ))}
        </HStack>
      </Box>
    </VStack>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { slug } = ctx.params as { [k: string]: string };

  if (slug[0] !== "@") {
    const url = await provider.url
      .getURL(slug as string)
      .then((doc): string | undefined => doc.data()?.url);
    if (url) {
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
      };
    }
  } else
    return {
      props: { handle: slug },
    };
  return {
    notFound: true,
  };
}

const ScoreBox = ({ testScore }) => {
  return (
    <Box border="1px solid" borderRadius={4} borderColor="white">
      <VStack align="stretch" my={4} ml={4} mr={4} spacing={6}>
        <VStack align="stretch">
          <Text fontSize="3xl">
            <b>
              {testScore.lang === "Swift"
                ? `iOS Course Assessment ${testScore.year}`
                : testScore.lang === "Android"
                ? `Android Course Assessment ${testScore.year}`
                : `React Native Course Assessment ${testScore.year}`}
            </b>
          </Text>
          <HStack spacing={10}>
            <Text fontSize="xl">
              <b>Score: </b>
              {`${testScore.score}/${testScore.total}`}
            </Text>
            <LinkButton
              href={testScore.dwnloadLink}
              customButton={
                <Button colorScheme="red" size="sm" leftIcon={<FaDownload />} />
              }
            >
              Download File
            </LinkButton>
          </HStack>
        </VStack>
        <VStack align="stretch">
          <Text fontSize="lg">
            <b>Markers Comment:</b>
          </Text>
          <Text fontSize="md">{testScore.markersComments}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};
