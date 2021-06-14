import { Button, VStack } from "@chakra-ui/react";
import { useAuth } from "../../services/auth";

export default function JoinPage() {
  const { auth } = useAuth();

  return (
    <VStack>
      <Button colorScheme="red" onClick={auth.signOut}>
        Sign Out
      </Button>
    </VStack>
  );
}
