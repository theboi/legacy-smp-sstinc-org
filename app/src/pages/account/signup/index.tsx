import {
  Button,
  Badge,
  Avatar,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Box,
  Image,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Checkbox,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaGithub, FaGoogle } from "react-icons/fa";
import { authProvider } from "../../../model/auth";
import { provider } from "../../../model/provider";
import { User, UserRole } from "../../../model/user";

interface SignUpOption {
  description: string;
  emoji: string;
  type: SignUpType;
}

interface SignUpField {
  placeholder: string;
  regex: RegExp;
}

enum SignUpType {
  Inc,
  Non,
}

export default function SignUpPage(props: { user: User }) {
  const [step, setStep] = useState(0);
  const [signUpType, setSignUpType] = useState(SignUpType.Non);
  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
    authProvider.getPrivacyPolicy().then((pp) => setPrivacy(pp));
  });

  const signUpOptions: SignUpOption[] = [
    {
      description: "I am a member of SST Inc.",
      emoji: "😄",
      type: SignUpType.Inc,
    },
    {
      description: "I am just interested!",
      emoji: "😬",
      type: SignUpType.Non,
    },
  ];

  const steps = [
    <Box>
      <Heading>Let's get you ready to use SMP!</Heading>
      <Text>
        If you are a member of SST Inc., you may also link your SST Inc ID to
        SMP.
      </Text>
      <SimpleGrid columns={2} minChildWidth={300} gap={10}>
        {signUpOptions.map((e) => (
          <Button
            variant="outline"
            height={150}
            key={e.description}
            flexDir="column"
            onClick={() => {
              setSignUpType(e.type);
              setStep((s) => s + (e.type === SignUpType.Inc ? 1 : 2));
            }}
          >
            <Text fontSize="5xl">{e.emoji}</Text>
            <Text fontSize="lg">{e.description}</Text>
          </Button>
        ))}
      </SimpleGrid>
    </Box>,
    <Box>
      <Heading>Verify that you are from SST Inc.</Heading>
      <Stack spacing={3}>
        <FormControl id="first-name" isRequired>
          <FormLabel>SST Class</FormLabel>
          <InputGroup>
            <InputLeftAddon>S</InputLeftAddon>
            <Input placeholder="301" />
          </InputGroup>
        </FormControl>
        <Button leftIcon={<FaGoogle />} colorScheme="red">
          Verify with Google
        </Button>
      </Stack>
    </Box>,
    <Box>
      <Heading>Just a little note.</Heading>
      <Skeleton isLoaded={privacy != ""} height={100}>
        <Text>{privacy}</Text>
      </Skeleton>
      <Stack spacing={3}>
        <Checkbox>I have read and acknowledged.</Checkbox>
        <Button colorScheme="green">Next</Button>
      </Stack>
    </Box>,
    <Box>
      <Heading>Great! One last step!</Heading>
      <Stack spacing={3}>
        <FormLabel>
          Sign in with GitHub to customise your profile page (and prevent bot
          accounts 😬!)
        </FormLabel>
        <Button leftIcon={<FaGithub />} colorScheme="gray">
          Verify with GitHub
        </Button>
      </Stack>
    </Box>,
  ];

  return (
    <Box display="flex" gap={10}>
      {step > 0 ? (
        <IconButton
          onClick={() =>
            setStep((s) => s - (signUpType === SignUpType.Inc ? 1 : 2))
          }
          icon={<FaArrowLeft />}
          aria-label="Back"
          alignSelf="start"
        />
      ) : null}
      {steps[step]}
    </Box>
  );
}

// nonsstinc: email, github, profile
// sstinc: class, email + sign in, github
