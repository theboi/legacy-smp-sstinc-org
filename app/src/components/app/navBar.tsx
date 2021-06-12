import { MenuButton } from "@chakra-ui/react";
import { MenuList } from "@chakra-ui/react";
import { MenuItem } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MenuDivider } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { User, UserRole } from "../../objects/user";
import NextLink from "next/link";
import {
  FaBook,
  FaBug,
  FaCog,
  FaLink,
  FaSignInAlt,
  FaSun,
} from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import { authPaths } from "../../pages/_app";
import { AuthProvider, useAuth } from "../../services/auth";

interface NavLink {
  minRole?: UserRole;
  isDivider?: boolean;
  name?: string;
  // Allows for any FontAwesome icon or other React element like images
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  action?: (() => void) | string;
}

export const NavBar = () => {
  const { toggleColorMode } = useColorMode();

  const { auth, user } = useAuth();

  const links: NavLink[] = [
    {
      name: user === null ? "Sign In" : user?.name,
      icon:
        user === null ? (
          <FaSignInAlt />
        ) : (
          <Avatar src={user?.photoURL} size="sm" />
        ),
      action: user === null ? auth.signIn : `/@${user?.handle}`,
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
      name: "Settings",
      icon: <FaCog />,
      action: "/settings",
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
        icon={<Avatar src={user?.photoURL} size="md" />}
        variant="outline"
      />
      <MenuList>
        {links.map((e, i) => {
          if (user?.role < e.minRole) return null;
          else if (e.isDivider) return <MenuDivider key={i} />;
          if (typeof e.action === "string" || e.action instanceof String) {
            return (
              <NextLink key={i} href={e.action as string}>
                <ChakraLink
                  href={e.action as string}
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem icon={e.icon}>{e.name}</MenuItem>
                </ChakraLink>
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
