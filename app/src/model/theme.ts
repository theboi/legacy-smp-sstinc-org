import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  fonts: {
    heading: "Rubik",
    body: "Rubik",
  },
  styles: {
    global: (props) => ({
      // "html, body": {
      //   fontSize: "sm",
      //   color: props.colorMode === "dark" ? "white" : "gray.600",
      //   lineHeight: "tall",
      // },
      // a: {
      //   color: props.colorMode === "dark" ? "teal.300" : "teal.500",
      // },
      div: {
        borderRadius: 8,
      },
    }),
  },
});
