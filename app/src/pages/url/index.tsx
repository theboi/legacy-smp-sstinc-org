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
  Text,
} from "@chakra-ui/react";

import { FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";

export default function URLsPage() {
  const [urls, setUrls] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const urlRef = useRef(null);
  const suffixRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    // const unsubscribe = provider.url.getURLsSnapshot((snapshot) => {
    //   setUrls(
    //     snapshot.docs.map((e) => ({
    //       url: e.data().url,
    //       suffix: e.id,
    //     }))
    //   );
    // });
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  function saveURL() {
    const valid = validateURL();
    if (valid !== undefined) {
      // provider.url.updateURL(valid.suffix, valid.url);
      onClose();
      toast({ title: "Shortened URL saved successfully!", status: "success" });
    }
    toast({ title: "An error occurred while saving", status: "error" });
  }

  function validateURL(): { suffix: string; url: string } {
    let url: string = urlRef.current.value;
    let suffix: string = suffixRef.current.value;
    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
      url = `https://${url}`;
    }
    if (suffix === "") {
      suffix = "a"; // random
    }
    if (
      /^https?:\/\/[a-zA-Z0-9-._~!*'();:@&=+$,\/?#\[\]%]+$/g.test(url) &&
      /^\w+$/g.test(suffix)
    ) {
      return { url, suffix };
    }
    return undefined;
  }

  function deleteURL(suffix: string) {
    // provider.url.deleteURL(suffix);
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
              <FormLabel>Long URL</FormLabel>
              <Input
                ref={urlRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.keyCode === 13) {
                    suffixRef.current.focus();
                  }
                }}
                placeholder="sstinc.org"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Short URL (Suffix)</FormLabel>
              <InputGroup>
                <InputLeftAddon>smp.sstinc.org/</InputLeftAddon>
                <Input
                  ref={suffixRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.keyCode === 13) saveURL();
                  }}
                  placeholder="sstinc"
                />
              </InputGroup>
              <Text size="xs">
                Leaving the field empty would create a randomly generated alias.
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveURL}>
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
                      <MenuItem
                        icon={<FaTrash />}
                        onClick={() => deleteURL(e.suffix)}
                      >
                        Delete
                      </MenuItem>
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

// function genRandAlias() {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";
//   let randomAlias = "";
//   for (var i = 0; i < 4; i++) {
//     randomAlias += characters.charAt(
//       Math.floor(Math.random() * characters.length)
//     );
//   }
//   firebase
//     .firestore()
//     .collection("links")
//     .get()
//     .then((col) => {
//       col.docs.map((doc) => {
//         if (randomAlias === doc.data().suffix) {
//           return genRandAlias();
//         }
//       });
//     });
//   return randomAlias;
// }
