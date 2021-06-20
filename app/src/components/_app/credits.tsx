import {
  Link,
  ButtonGroup,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaAdjust, FaMoon, FaSun } from "react-icons/fa";
import { useColor } from "../../hooks/color";
import { ReactNode } from "react";

interface ColorModeOption {
  icon: ReactNode;
  ariaLabel: string;
  key: string;
}

export const Credits = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeOptions: ColorModeOption[] = [
    {
      icon: <FaSun />,
      ariaLabel: "Light theme",
      key: "light",
    },
    // {
    //   icon: <FaAdjust />,
    //   ariaLabel: "Automatic theme"
    // },
    {
      icon: <FaMoon />,
      ariaLabel: "Dark theme",
      key: "dark",
    },
  ];

  return (
    <Text
      style={{ margin: "25px 0", textAlign: "center", fontSize: 13 }}
      color=""
    >
      Made with ♥&#xFE0E; by{" "}
      <Link
        color={useColor("link")}
        href="https://www.ryanthe.com"
        target="_blank"
        rel="noreferrer"
      >
        Ryan The
      </Link>{" "}
      from SST Inc, 2021, v2.1.0. <br />
      Open sourced on{" "}
      <Link
        color={useColor("link")}
        href="https://github.com/theboi/smp-sstinc-org"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </Link>
      .{" "}
      {/* <ButtonGroup size="sm" isAttached variant="outline">
        {colorModeOptions.map((o) => (
          <IconButton
          variant={o.key === colorMode ? "solid" : undefined}
          colorScheme="blue"
          onClick={toggleColorMode}
          aria-label={o.ariaLabel}
        />
        ))}
      </ButtonGroup> */}
    </Text>
  );
};
