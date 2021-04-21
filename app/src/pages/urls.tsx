import { useEffect, useRef, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  ModalHeader,
  ModalFooter,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";

import { FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";
import { fbProvider } from "../model/fbProvider";

export default function UrlsPage() {
  const [urls, setUrls] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const urlRef = useRef(null);
  const suffixRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    const unsubscribe = fbProvider.url.listAll((snapshot) => {
      setUrls(
        snapshot.docs.map((e) => ({
          url: e.data().url,
          suffix: e.id,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function saveURLData() {
    const valid = validateURLData();
    if (valid !== undefined) {
      fbProvider.url.updateUrl(valid.suffix, valid.url);
      onClose();
      toast({ title: "Shortened URL saved successfully!", status: "success" });
    }
    toast({ title: "An error occurred while saving", status: "error" });
  }

  function validateURLData(): { suffix: string; url: string } {
    if (
      (suffixRef.current.value as string).match(/^\w+$/g) === [] &&
      (urlRef.current.value as string).match(/^.+$/g) === []
    ) {
      return {
        suffix: suffixRef.current.value,
        url: urlRef.current.value,
      };
    }

    return undefined;
  }

  return (
    <>
      <Modal initialFocusRef={urlRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new shortened URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input
                ref={urlRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.keyCode === 13)
                    suffixRef.current.focus();
                }}
                placeholder="sstinc.org"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Suffix</FormLabel>
              <InputGroup>
                <InputLeftAddon>smp.sstinc.org/</InputLeftAddon>
                <Input
                  ref={suffixRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.keyCode === 13) saveURLData();
                  }}
                  placeholder="sstinc"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveURLData}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Suffix</Th>
              <Th>URL</Th>
              <Th isNumeric>
                <IconButton
                  aria-label="Add New"
                  icon={<FaPlus />}
                  onClick={onOpen}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {urls.map((e, i) => (
              <Tr key={i}>
                <Td style={{ maxWidth: "10px" }}>{e.suffix}</Td>
                <Td style={{ maxWidth: "30vw" }}>{e.url}</Td>
                <Td isNumeric>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="More Actions"
                      icon={<FaEllipsisH />}
                      variant=""
                    />
                    <MenuList>
                      <MenuItem icon={<FaTrash />}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th />
              <Th />
              <Th isNumeric />
            </Tr>
          </Tfoot>
        </Table>
      </div>
    </>
  );
}
