import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useColor } from "../../../hooks/color";

export default function Link({
  href,
  children,
  target = "",
  inlineStyle = false,
  shallow = false,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  inlineStyle?: boolean;
  shallow?: boolean;
}) {
  return (
    <NextLink href={href} shallow={shallow}>
      <ChakraLink
        color={inlineStyle ? useColor("link") : undefined}
        href={href}
        target={target ?? (href.startsWith("/") ? "" : "_blank")}
        _hover={{ textDecoration: inlineStyle ? "underline" : "none" }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}
