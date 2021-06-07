import { Box, Center, CSSReset, Heading } from "@chakra-ui/react";
import { useColor } from "../../hooks/color";
import { Assignment } from "../../objects/train";
import MarkdownIt from "markdown-it";

export default function AssignmentContent({
  assignment,
}: {
  assignment: Assignment;
}) {
  const md = new MarkdownIt();

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
                assignment?.content ?? "No Content"
              )}</md>`,
            }}
          />
        ),
        slide: <div></div>,
      }[assignment?.type] ?? <Center height="100%">No Selection</Center>}
    </Box>
  );
}
