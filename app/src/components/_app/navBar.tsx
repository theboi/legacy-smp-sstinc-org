import { Link as ChakraLink, Box } from "@chakra-ui/react";
import Image from "next/image";
import NavMenu from "./navMenu";

export default function NavBar() {
  return (
    <nav style={{ height: 100, position: "relative" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 999,
        }}
      >
        <ChakraLink
          href="https://sstinc.org"
          rel="noreferrer noopener"
          target="_blank"
          sx={{ mr: "auto" }}
        >
          <Image
            src="/assets/sstinc-icon.png"
            alt="SST Inc Icon"
            width={100}
            height={100}
          />
        </ChakraLink>
        <NavMenu />
      </Box>
    </nav>
  );
}
