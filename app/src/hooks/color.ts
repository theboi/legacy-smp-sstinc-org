import { useColorModeValue } from "@chakra-ui/react";

export const useColor = (name: string): string =>
  useColorModeValue(`var(--l-${name})`, `var(--d-${name})`);

export const useCustomColor = (lightColor: string, darkColor: string) =>
  useColorModeValue(
    parseChakraColor(lightColor) || "inherit",
    parseChakraColor(darkColor) || "inherit"
  );

function parseChakraColor(input: string) {
  if (input?.match(/^.*\.\d*$/))
    return `var(--chakra-colors-${input.replace(".", "-")})`;
  return input;
}
