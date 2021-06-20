import { Avatar, IconButton, Menu, MenuButton } from "@chakra-ui/react";
import { FaBook, FaBug, FaCog, FaLink, FaSignInAlt } from "react-icons/fa";
import { authPaths } from "../../pages/_app";
import { useAuth } from "../../hooks/auth";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemNest,
  MenuItemOption,
  MenuItemGroup,
} from "../../typings/theme/menu";
import MenuList from "../theme/menuList";

export default function NavMenu() {
  const { user, auth } = useAuth();

  const navItems: MenuItem[] = [
    new MenuItemOption(
      user === null ? "Sign In" : user?.name,
      user === null ? auth.signIn : `/@${user?.handle}`,
      user === null ? (
        <FaSignInAlt />
      ) : (
        <Avatar src={user?.photoURL} size="sm" />
      )
    ),
    new MenuItemOption("Train", "/train", <FaBook />),
    new MenuItemDivider(),
    new MenuItemOption("Settings", "/settings", <FaCog />),
    new MenuItemOption(
      "Bug Report",
      "https://github.com/theboi/smp-sstinc-org/issues",
      <FaBug />
    ),
    new MenuItemGroup(
      [new MenuItemOption("URL Shortener", "/url", <FaLink />)],
      authPaths["/url"]
    ),
    new MenuItemNest(
      "ExCo",
      [new MenuItemOption("URL Shortener", "/url", <FaLink />)],
      authPaths["/url"]
    ),
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
      <MenuList menuItems={navItems} />
    </Menu>
  );
}
