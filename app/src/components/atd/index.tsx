import { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import hash from "crypto-js/sha256";

import { FaKey } from "react-icons/fa";
import {
  Button,
  IconButton,
  ButtonGroup,
  Heading,
  PinInputField,
  PinInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Code,
  VStack,
  AlertTitle,
  AlertDescription,
  Alert,
  Box,
} from "@chakra-ui/react";
import { useCustomColor } from "../../hooks/color";
import { useAuth } from "../../hooks/auth";
import { UserRole } from "../../typings/user";
import { useHost } from "../../hooks/host";
import {
  PostAttendanceRecordAPIBody,
  PostAttendanceRecordAPIResponse,
} from "../../pages/api/v1/atd";
import { post } from "../../utils/api/httpMethods";

export default function AtdField() {
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(getKeyCode());
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Confirm");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, getToken } = useAuth();
  const host = useHost();

  useEffect(() => {
    const interval = setInterval(() => {
      const epochSeconds = Math.floor(new Date().getTime() / 1000);
      setTime(epochSeconds % 20);
      return setKey(getKeyCode());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function onCodeChange(s: string) {
    setCode(s.toUpperCase());
  }

  function getKeyCode() {
    const epochSeconds = new Date().getTime() / 1000;
    return hash(`sstinc${epochSeconds - (epochSeconds % 20)}`)
      .toString()
      .slice(0, 4)
      .toUpperCase();
  }

  const confirmCode = async () => {
    setStatus("Loading");
    const data = (
      await post<PostAttendanceRecordAPIResponse, PostAttendanceRecordAPIBody>(
        `${
          process.env.NODE_ENV === "production" ? "https" : "http"
        }://${host}/api/v1/atd`,
        await getToken(),
        { code }
      )
    ).data;
    setStatus(data.status);
    /** Code submission cooldown of 2 sec */
    setTimeout(() => {
      setCode("");
      setStatus("Confirm");
    }, 4000);
  };

  function onCodeKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13 && code.length === 4) confirmCode();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py={10}>
            <VStack>
              <Heading size="sm">
                Enter this code at{" "}
                <Code colorScheme="blue">smp.sstinc.org</Code>
              </Heading>
              <HStack>
                <PinInput type="alphanumeric" value={key} size="" isDisabled>
                  {[...Array(4)].map((e, i) => (
                    <PinInputField
                      style={{
                        fontSize: "2em",
                        opacity: 1,
                      }}
                      key={i}
                    />
                  ))}
                </PinInput>
                <CircularProgress value={time} max={20}>
                  <CircularProgressLabel fontSize="lg">
                    {20 - time}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Alert status="info">
        <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AlertTitle fontSize={"xl"}>Attendance</AlertTitle>
          <AlertDescription display="block">
            Kindly enter the 4 digit code provided to check-in to SST Inc.
          </AlertDescription>
          <Box style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Box>
              <HStack onKeyDown={onCodeKeyDown}>
                <PinInput
                  otp
                  type="alphanumeric"
                  size="xl"
                  value={code}
                  onChange={onCodeChange}
                  isInvalid={status === "Invalid"}
                >
                  {[...Array(4)].map((_, i) => (
                    <PinInputField
                      style={{ fontSize: "2em" }}
                      borderColor={useCustomColor("blackAlpha.400", null)}
                      _hover={{
                        borderColor: useCustomColor(
                          "blackAlpha.500",
                          "whiteAlpha.500"
                        ),
                      }}
                      key={i}
                    />
                  ))}
                </PinInput>
              </HStack>
            </Box>
            <ButtonGroup isAttached width="100%">
              <Button
                isFullWidth
                onClick={confirmCode}
                disabled={status !== "Confirm" || code.length !== 4}
                colorScheme={
                  { Error: "red", Invalid: "red", Success: "green" }[status] ??
                  "blue"
                }
                isLoading={status === "Loading"}
              >
                {status}
              </Button>
              {user?.role >= UserRole.ExCo ? (
                <IconButton
                  onClick={onOpen}
                  aria-label="View Key Code"
                  icon={<FaKey />}
                />
              ) : null}
            </ButtonGroup>
          </Box>
          {/* <Button disabled>Scan a QR Code instead</Button> */}
        </Box>
      </Alert>
    </>
  );
}
