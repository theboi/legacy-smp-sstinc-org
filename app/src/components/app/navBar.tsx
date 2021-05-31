import { MenuButton } from "@chakra-ui/react";
import { MenuList } from "@chakra-ui/react";
import { MenuItem } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MenuDivider } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { User, UserRole } from "../../services/userold";
import NextLink from "next/link";
import { FaBook, FaBug, FaLink, FaSignInAlt, FaSun } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import { authPaths } from "../../pages/_app";
import { AuthProvider } from "../../providers/auth";

interface NavLink {
  minRole?: UserRole;
  isDivider?: boolean;
  name?: string;
  // Allows for any FontAwesome icon or other React element like images
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  action?: (() => void) | string;
}

export const NavBar = (props: { user: User }) => {
  const { toggleColorMode } = useColorMode();

  const links: NavLink[] = [
    {
      name: props.user === null ? "Sign In" : props.user.displayName,
      icon:
        props.user === null ? (
          <FaSignInAlt />
        ) : (
          <Avatar src={props.user?.photoURL} size="sm" />
        ),
      action: props.user === null ? AuthProvider.signIn : "/profile",
    },
    {
      name: "Train",
      icon: <FaBook />,
      action: "/train",
    },
    {
      name: "URL Shortener",
      icon: <FaLink />,
      action: "/url",
      minRole: authPaths["/url"],
    },
    {
      name: "Toggle Theme",
      icon: <FaSun />,
      action: () => toggleColorMode(),
    },
    {
      name: "Bug Report",
      icon: <FaBug />,
      action: "https://github.com/theboi/smp-sstinc-org/issues",
    },
  ];

  return (
    <Menu placement="bottom-end">
      <MenuButton
        boxSize="60px"
        style={{ borderRadius: 100 }}
        as={IconButton}
        aria-label="Menu"
        icon={<Avatar src={props.user?.photoURL} size="md" />}
        variant="outline"
      />
      <MenuList>
        {links.map((e, i) => {
          if (props.user?.role < e.minRole) return null;
          else if (e.isDivider) return <MenuDivider key={i} />;
          if (typeof e.action === "string" || e.action instanceof String) {
            return (
              <NextLink href={e.action as string}>
                <MenuItem key={i} icon={e.icon}>
                  <ChakraLink>{e.name}</ChakraLink>
                </MenuItem>
              </NextLink>
            );
          } else {
            return (
              <MenuItem key={i} icon={e.icon} onClick={e.action}>
                {e.name}
              </MenuItem>
            );
          }
        })}
      </MenuList>
    </Menu>
  );
};
