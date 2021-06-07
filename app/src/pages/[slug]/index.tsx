import { GetServerSidePropsContext } from "next";
import { provider } from "../../model/provider";
import { getUserAPI } from "../api/v1/user/[slug]";

import { Button, Badge, Avatar, Heading, Text, VStack } from "@chakra-ui/react";
import { useUserWithHandle } from "../../services/users";

export default function ProfilePage({ handle }: { handle: string }) {
  const { user, error } = useUserWithHandle(handle);

  return (
    <VStack>
      <Avatar name={user?.name} src={user?.photoURL} size="2xl" />
      <Heading>{user?.name}</Heading>
      <Text>@{user?.handle}</Text>
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
