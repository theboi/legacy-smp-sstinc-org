import React, { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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
} from "@chakra-ui/react";

import { fbProvider } from "../../model/fbProvider";
import { User, UserRole } from "../../model/user";
import { FaBars, FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";

export default function UrlsPage(props: { user: User }) {
  const [urls, setUrls] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={10}>
          </ModalBody>
        </ModalContent>
      </Modal>
    <div>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Suffix</Th>
            <Th>URL</Th>
            <Th isNumeric>
              <IconButton aria-label="Add New" icon={<FaPlus />} onClick={onOpen} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {urls.map((e, i) => (
            <Tr key={i}>
              <Td>{e.suffix}</Td>
              <Td style={{ textOverflow: "ellipsis", maxWidth: 400 }}>
                {e.url}
              </Td>
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
            <Th></Th>
            <Th></Th>
            <Th isNumeric></Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
    </>
  );
}