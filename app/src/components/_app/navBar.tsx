import { Link as ChakraLink } from "@chakra-ui/react";
import Image from "next/image";
import NavMenu from "./navMenu";

export default function NavBar() {
  return (
    <nav style={{ display: "flex", alignItems: "center", padding: "0 30px" }}>
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
    </nav>
  );
}
