import { GetServerSidePropsContext } from "next";
import useSWR from "swr";
import {
  Avatar,
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { User, UserRole } from "../../typings/user";
import { useAuth } from "../../hooks/auth";

export default function ProfilePage({ handle }: { handle: string }) {
  const { fbUser } = useAuth();
  const { data: user } = useSWR<User>(fbUser && `/api/v1/user/${handle}`);

  // Temporary Test Score
  const tempTestScore = [
    {
      lang: "Swift",
      year: "2021",
      score: "10",
      total: "10",
      markersComments: "Placeholder",
      dwnloadLink: "https://drive.google.com",
    },
    {
      lang: "Android",
      year: "2021",
      score: "10",
      total: "10",
      markersComments: "Placeholder",
      dwnloadLink: "https://drive.google.com",
    },
  ];

  return (
    <VStack spacing={70}>
      <HStack spacing={3}>
        <Avatar name={user?.name} src={user?.photoURL} size="2xl" />
        <VStack align="stretch">
          <HStack spacing={2}>
            <Heading>{user?.name}</Heading>
            <Badge
              colorScheme={(() => {
                if (user?.role <= 0) {
                  return "red";
                } else if (user?.role === 1) {
                  return "orange";
                } else if (user?.role <= 2) {
                  return "yellow";
                } else if (user?.role <= 4) {
                  return "green";
                } else if (user?.role <= 6) {
                  return "blue";
                } else if (user?.role <= 8) {
                  return "purple";
                } else {
                  return "gold";
                }
              })()}
            >
              {UserRole[user?.role]}
            </Badge>
          </HStack>
          <Text>@{user?.handle}</Text>
          <Heading size="sm">Points: {user?.points}</Heading>
        </VStack>
      </HStack>
      <Box>
        <HStack spacing={5}>
          {/* {tempTestScore.map((s,i) => (
            <ScoreBox key={i} testScore={s} />
          ))} */}
        </HStack>
      </Box>
    </VStack>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { slug } = ctx.params as { [k: string]: string };

  if (slug[0] !== "@") {
    const url = false; //await provider.url
    // .getURL(slug as string)
    // .then((doc): string | undefined => doc.data()?.url);
    if (url) {
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
      };
    }
  } else
    return {
      props: { handle: slug },
    };
  return {
    notFound: true,
  };
}

// const ScoreBox = ({ testScore }) => {
//   return (
//     <Box border="1px solid" borderRadius={4} borderColor="white">
//       <VStack align="stretch" my={4} ml={4} mr={4} spacing={6}>
//         <VStack align="stretch">
//           <Text fontSize="3xl">
//             <b>
//               {testScore.lang === "Swift"
//                 ? `iOS Course Assessment ${testScore.year}`
//                 : testScore.lang === "Android"
//                 ? `Android Course Assessment ${testScore.year}`
//                 : `React Native Course Assessment ${testScore.year}`}
//             </b>
//           </Text>
//           <HStack spacing={10}>
//             <Text fontSize="xl">
//               <b>Score: </b>
//               {`${testScore.score}/${testScore.total}`}
//             </Text>
//             <LinkButton
//               href={testScore.dwnloadLink}
//               customButton={
//                 <Button colorScheme="red" size="sm" leftIcon={<FaDownload />} />
//               }
//             >
//               Download File
//             </LinkButton>
//           </HStack>
//         </VStack>
//         <VStack align="stretch">
//           <Text fontSize="lg">
//             <b>Markers Comment:</b>
//           </Text>
//           <Text fontSize="md">{testScore.markersComments}</Text>
//         </VStack>
//       </VStack>
//     </Box>
//   );
// };
