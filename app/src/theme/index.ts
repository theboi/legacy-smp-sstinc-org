import { extendTheme } from "@chakra-ui/react";
import components from "./components";

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
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
  colors: {
    gold: {
      "50": "#FFFBE5",
      "100": "#FFF4B8",
      "200": "#FFED8A",
      "300": "#FFE55C",
      "400": "#FFDE2E",
      "500": "#FFD700",
      "600": "#CCAC00",
      "700": "#998100",
      "800": "#665600",
      "900": "#332B00",
    },
    // black: "#0D1821",
    // white: "#D8D4F2",
  },
  components,
});
