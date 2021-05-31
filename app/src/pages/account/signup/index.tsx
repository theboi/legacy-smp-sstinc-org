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
import { AuthProvider } from "../../../providers/auth";
import { User } from "../../../services/userold";
import { useColor } from "../../../hooks/color";

interface SignUpOption {
  description: string;
  emoji: string;
  isInc: boolean;
}

interface SignUpField {
  placeholder: string;
  regex: RegExp;
}

export default function SignUpPage(props: { user: User }) {
  const [step, setStep] = useState(0);
  const [isInc, setIsInc] = useState(false);
  const [verified, setVerified] = useState(false);
  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
    AuthProvider.getPrivacyPolicy().then((pp) => setPrivacy(pp));
  });

  const signUpOptions: SignUpOption[] = [
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

  const steps = [
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
        {signUpOptions.map((e) => (
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
    <Box>
      <Heading>Connect your internet accounts</Heading>
      <Stack maxWidth={500}>
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
          <FormLabel>Verify your humanity</FormLabel>
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
    <Box>
      <Heading>Just a little note.</Heading>
      <Skeleton isLoaded={privacy != ""} height={100}>
        <Text>{privacy}</Text>
      </Skeleton>
      <Stack>
        <Checkbox>I have read and acknowledged.</Checkbox>
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
    setStep((s) => s + 1);
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
      {step > 0 ? <Button colorScheme="green">Next</Button> : null}
    </Box>
  );
}

// nonsstinc: email, github, profile
// sstinc: class, email + sign in, github
