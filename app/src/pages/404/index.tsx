import { Box, Heading, useColorMode, Image } from "@chakra-ui/react";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { random } from "../../utils/misc";

interface ErrorCode {
  msg: string;
  cap: string;
}

export default function ErrorPage({ status = 404 }: { status: number }) {
  const { colorMode } = useColorMode();
  const [imgNum, setImgNum] = useState<number>();

  useEffect(() => {
    if (!imgNum) setImgNum(random(1, 5));
  }, []);

  const codes: { [k: number]: ErrorCode } = {
    403: {
      msg: "For Biden",
      cap: "Not You",
    },
    404: {
      msg: "Not Found",
      cap: "Oops",
    },
  };

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
          <Image
            style={{ borderRadius: 10, maxWidth: 300 }}
            src={`/assets/errors/${status}-${imgNum}.png`}
            alt={`${status}: ${codes[status].msg}`}
          />
          <figcaption className={style.cap} style={{ color: "white" }}>
            {codes[status].cap}
          </figcaption>
        </figure>
      </Box>
      <Heading className={style.errorCode} size="4xl" style={{ lineHeight: 1 }}>
        {status}
      </Heading>
      <Heading size="md">{codes[status].msg}</Heading>
    </div>
  );
}
