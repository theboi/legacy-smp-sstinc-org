import {
  Button,
  Badge,
  Avatar,
  Heading,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { authProvider } from "../../../providers/auth";
import { provider } from "../../../model/provider";
import { User, UserRole } from "../../../services/userold";

export default function ProfilePage(props: { user: User }) {
  return (
    <div style={{ maxWidth: "5=700px" }}>
      {props.user === null ? (
        <Button colorScheme="blue" onClick={authProvider.signIn}>
          Sign In
        </Button>
      ) : (
        <>
          <Box mb={3}>
            <Flex gridGap={5} flexWrap="wrap">
              <Avatar
                name={props.user?.displayName}
                src={props.user?.photoURL}
                size="xl"
              />
              <Box mr={3}>
                <Heading size="md">{props.user?.displayName}</Heading>
                <Text>{props.user?.email}</Text>
                <Text>{props.user?.buff}</Text>
                <Badge colorScheme="red">{UserRole[props.user?.role]}</Badge>
              </Box>
            </Flex>
          </Box>
          <Button colorScheme="red" onClick={authProvider.signOut}>
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
