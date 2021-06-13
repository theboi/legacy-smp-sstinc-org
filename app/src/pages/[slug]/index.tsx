import { GetServerSidePropsContext } from "next";
import { provider } from "../../model/provider";
import { getUserAPI } from "../api/v1/user/[slug]";

import { Button, Avatar, Heading, Text, VStack, Box, HStack, Badge } from "@chakra-ui/react";
import { useUserWithHandle } from "../../services/users";

export default function ProfilePage({ handle }: { handle: string }) {
  const { user, error } = useUserWithHandle(handle);
  const roles = ["Banned","Member","Trainee","Employee","Associate","Alumni","ExCo","Consultant","BOD","Root"];
  var roleColor = ""
  if (roles[user?.role] == "Consultant" || roles[user?.role] == "BOD") {
    roleColor = "red"
  } else if (roles[user?.role] == "ExCo") {
    roleColor = "green"
  } else if (roles[user?.role] == "Root") {
    roleColor = "purple"
  }
    return (
      <VStack>
        <Avatar name={user?.name} src={user?.photoURL} size="2xl" />
        <HStack spacing={2}>
          <Heading>{user?.name}</Heading>
          <Badge colorScheme={roleColor}>{roles[user?.role]}</Badge>
        </HStack>
        <Text>@{user?.handle}</Text>
        <HStack>
          <Text><b>Points: </b>{user?.points}</Text>
        </HStack>
      </VStack>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { slug } = ctx.params as { [key: string]: string };

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
  } else if (await getUserAPI(slug)) {
    return {
      props: { handle: slug },
    };
  }
  return {
    notFound: true,
  };
}
