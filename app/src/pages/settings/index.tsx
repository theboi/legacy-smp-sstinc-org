import { Button, VStack } from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";

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
