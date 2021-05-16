import { Button, Badge, Avatar, Heading, Text, Flex } from "@chakra-ui/react";
import { provider } from "../../model/provider";
import { User, UserRole } from "../../model/user";

export default function ProfilePage(props: { user: User }) {
  return (
    <div style={{ maxWidth: 500 }}>
      {props.user === null ? (
        <Button colorScheme="blue" onClick={provider.auth.signIn}>
          Sign In
        </Button>
      ) : (
        <>
          <div>
            <Flex gridGap={5} flexWrap="wrap">
              <Avatar
                name={props.user?.displayName}
                src={props.user?.photoURL}
                size="xl"
              />
              <div>
                <Heading size="md">{props.user?.displayName}</Heading>
                <Text>{props.user?.email}</Text>
                <Text>{props.user?.buff}</Text>
                <Badge colorScheme="red">{UserRole[props.user?.role]}</Badge>
              </div>
            </Flex>
          </div>
          <Button colorScheme="red" onClick={provider.auth.signOut}>
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
}
