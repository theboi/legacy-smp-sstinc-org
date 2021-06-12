import { Button, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { cloneElement, ReactElement, ReactNode } from "react";

export const LinkButton = ({
  href,
  children,
  customButton = <Button />,
}: {
  href: string;
  children: ReactNode;
  customButton?: ReactElement;
}) => {
  const button = cloneElement(customButton, { children: children });

  return (
    <NextLink href={href}>
      <ChakraLink href={href} _hover={{ textDecoration: "none" }}>
        {button}
      </ChakraLink>
    </NextLink>
  );
};
