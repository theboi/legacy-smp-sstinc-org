import { Button, VStack } from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";

export default function JoinPage() {
  const { signOut } = useAuth();

  return (
    <VStack>
      <Button colorScheme="red" onClick={signOut}>
        Sign Out
      </Button>
    </VStack>
  );
}
