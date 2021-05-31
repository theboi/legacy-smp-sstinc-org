import { Link } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColor } from "../../hooks/color";

export const Credits = () => (
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
  </Text>
);
