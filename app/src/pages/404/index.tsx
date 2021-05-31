import { Box, Heading, useColorMode } from "@chakra-ui/react";
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
      cap: "Not You",
    },
    404: {
      msg: "Not Found",
      cap: "Oops",
    },
  };
  const status = props.status ?? 404;
  const imageSrc = `/assets/errors/${status}-${
    1 + Math.floor(Math.random() * 4)
  }.png`;

  return (
    <div className={style.main}>
      <Box
        shadow="dark-lg"
        boxShadow={colorMode === "dark" ? "dark-lg" : "lg"}
        border="1px solid"
        borderColor={colorMode === "dark" ? "transparent" : "gray.200"}
        rounded="2xl"
        mb={2}
      >
        <figure className={style.fig}>
          <img
            src={imageSrc}
            alt={`${status}: ${codes[status].msg}`}
            className={style.img}
          />
          <figcaption className={style.cap}>{codes[status].cap}</figcaption>
        </figure>
      </Box>
      <Heading className={style.errorCode} size="4xl" style={{ lineHeight: 1 }}>
        {status}
      </Heading>
      <Heading size="md">{codes[status].msg}</Heading>
    </div>
  );
}
