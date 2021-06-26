import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Link({
  href,
  target = "",
  children,
}: {
  href: string;
  target: string;
  children: React.ReactNode;
}) {
  return (
    <NextLink href={href}>
      <ChakraLink
        href={href}
        target={target}
        _hover={{ textDecoration: "none" }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}
