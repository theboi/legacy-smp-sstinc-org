import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import style from "./style.module.css";

interface ErrorCode {
  msg: string;
  cap: string;
}

export default function ErrorPage(props: { status: number }) {
  const { colorMode } = useColorMode();

  const codes: { [key: number]: ErrorCode } = {
    403: {
      msg: "For Biden",
      cap: "Not Trump",
    },
    404: {
      msg: "Not Found",
      cap: "IYKYK",
    },
  };
  const status = props.status ?? 404;

  return (
    <div className={style.main}>
      <Box
        shadow="dark-lg"
        boxShadow={colorMode === "dark" ? "dark-lg" : "lg"}
        border="1px solid"
        borderColor={colorMode === "dark" ? "transparent" : "gray.200"}
        rounded="2xl"
      >
        <figure className={style.fig}>
          <img
            src={`/assets/errors/${status}.png`}
            alt={`${status}: ${codes[status].msg}`}
            className={style.img}
          />
          <figcaption className={style.cap}>{codes[status].cap}</figcaption>
        </figure>
      </Box>
      <Heading className={style.errorCode} size="4xl" style={{ lineHeight: 1 }}>
        {status}
      </Heading>
      <Heading size="sm">{codes[status].msg}</Heading>
    </div>
  );
}
