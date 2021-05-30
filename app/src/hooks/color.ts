import { useColorModeValue } from "@chakra-ui/react";

export const useColor = (name: string): string =>
  useColorModeValue(`var(--l-${name})`, `var(--d-${name})`);
