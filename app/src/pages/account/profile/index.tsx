import { Button, Badge, Avatar, Heading, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../../../services/auth";
import { User, UserRole } from "../../../objects/user";

export default function ProfilePage() {
  const { auth, user } = useAuth();

  return (
    <div style={{ maxWidth: 500 }}>
      {user === null ? (
        <Button colorScheme="blue" onClick={auth.signIn}>
          Sign In
        </Button>
      ) : (
        <>
          <div>
            <Flex gridGap={5} flexWrap="wrap">
              <Avatar name={user?.name} src={user?.photoURL} size="xl" />
              <div>
                <Heading size="md">{user?.name}</Heading>
                <Text>{user?.email}</Text>
                <Badge colorScheme="red">{UserRole[user?.role]}</Badge>
                <Text>{user?.points}</Text>
              </div>
            </Flex>
          </div>
          <Button colorScheme="red" onClick={auth.signOut}>
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
}

// export async function getStaticProps() {
//   const train = new Train();

//   return {
//     props: { response },
//   };
// }
