import { Box, Center, CSSReset, Heading } from "@chakra-ui/react";
import { useColor } from "../../extensions/chakra";
import { Assignment } from "../../services/train";
import MarkdownIt from "markdown-it";

export default function AssignmentContent(props: { assignment: Assignment }) {
  const md = new MarkdownIt();
  console.log(props.assignment?.type);

  const x = CSSReset();

  return (
    <Box
      style={{
        flexBasis: "50vw",
        flexGrow: 9999,
        aspectRatio: "1920/1080",
        backgroundColor: useColor("bg2"),
      }}
    >
      {{
        article: (
          <Box
            dangerouslySetInnerHTML={{
              __html: `<md>${md.render(
                props.assignment?.content ?? "No Content"
              )}</md>`,
            }}
          />
        ),
        slide: <div></div>,
      }[props.assignment?.type] ?? <Center height="100%">No Selection</Center>}
    </Box>
  );
}
