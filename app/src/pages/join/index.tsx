import {
  Button,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Checkbox,
  Skeleton,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaGithub,
  FaGoogle,
  FaQuestionCircle,
} from "react-icons/fa";
import { useColor } from "../../hooks/color";
import { useGithubRawData } from "../../hooks/github";
import MarkdownIt from "markdown-it";
import { useAuth } from "../../hooks/auth";
import { useRouter } from "next/router";

interface JoinOption {
  description: string;
  emoji: string;
  isInc: boolean;
}

interface JoinField {
  placeholder: string;
  regex: RegExp;
}

export default function JoinPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isInc, setIsInc] = useState(false);
  const [verified, setVerified] = useState(false);
  const [checkedPP, setCheckedPP] = useState(false);

  const { data: privacy, error: privacyError } =
    useGithubRawData("/user/PRIVACY.md");

  useEffect(() => {
    console.log(user);
    if (user != null) router.replace("");
  }, [user]);
  const md = new MarkdownIt();

  const joinOptions: JoinOption[] = [
    {
      description: "I am a member of SST Inc",
      emoji: "😄",
      isInc: true,
    },
    {
      description: "I am just interested",
      emoji: "😬",
      isInc: false,
    },
  ];

  const getStepsAllowed = () => [true, verified, checkedPP];

  const steps = [
    // 0
    <Box>
      <Heading>Let's get you ready to use SMP!</Heading>
      <Text>
        If you are a member of SST Inc, please do indicate.{" "}
        <Link
          color={useColor("link")}
          target="_blank"
          href="https://sstinc.org"
        >
          What is SST Inc?
        </Link>
      </Text>
      <SimpleGrid columns={2} minChildWidth={300} gap={10}>
        {joinOptions.map((e) => (
          <Button
            variant="outline"
            height={150}
            key={e.description}
            flexDir="column"
            onClick={() => {
              setIsInc(e.isInc);
              goForward();
            }}
          >
            <Text fontSize="5xl">{e.emoji}</Text>
            <Text fontSize="lg">{e.description}</Text>
          </Button>
        ))}
      </SimpleGrid>
    </Box>,
    // 1
    <Box>
      <Heading>Connect your internet accounts</Heading>
      <Stack maxWidth={500} mt={2}>
        <FormControl isRequired>
          {isInc ? (
            <>
              <FormLabel>Verify your membership in SST Inc</FormLabel>
              <Button
                leftIcon={<FaGoogle />}
                colorScheme="red"
                disabled={verified}
              >
                {verified ? "Verified" : "Verify"} with Google
              </Button>
            </>
          ) : null}
          <FormLabel>Verify you are not a bot</FormLabel>
          <Box display="flex" flexDir="row">
            <Button leftIcon={<FaGithub />} colorScheme="gray">
              Verify with GitHub
            </Button>
            <Tooltip
              shouldWrapChildren
              label="GitHub is used to ensure that your email is verified and content such as your profile picture does not contain inappropriate content"
              fontSize="sm"
            >
              <FaQuestionCircle />
            </Tooltip>
          </Box>
          <FormHelperText>
            Don't have a GitHub account?{" "}
            <Link
              color={useColor("link")}
              href="https://github.com/"
              target="_blank"
            >
              Create one now!
            </Link>
          </FormHelperText>
        </FormControl>
      </Stack>
    </Box>,
    // 2
    <Box>
      <Heading>Just a little note.</Heading>
      <Skeleton isLoaded={privacy != ""} height={300} overflow="scroll">
        <Box
          dangerouslySetInnerHTML={{
            __html: `<md>${md.render(privacy ?? "")}</md>`,
          }}
        />
      </Skeleton>
      <Stack>
        <Checkbox
          onChange={(e) => setCheckedPP(e.target.checked)}
          isChecked={checkedPP}
        >
          I have read and acknowledged.
        </Checkbox>
      </Stack>
    </Box>,
    <Box>
      <Heading>Great! One last step!</Heading>
      <Stack></Stack>
    </Box>,
  ];

  const goBack = () => {
    setStep((s) => s - 1);
  };

  const goForward = () => {
    if (getStepsAllowed()[step]) setStep((s) => s + 1);
  };

  return (
    <Box style={{ display: "flex", gap: 10, maxWidth: 800, margin: "0 auto" }}>
      {step > 0 ? (
        <IconButton
          onClick={goBack}
          icon={<FaArrowLeft />}
          aria-label="Back"
          alignSelf="start"
        />
      ) : null}
      {steps[step]}
      {step > 0 ? (
        <Button
          colorScheme="green"
          disabled={!getStepsAllowed()[step]}
          onClick={goForward}
        >
          Next
        </Button>
      ) : null}
    </Box>
  );
}
