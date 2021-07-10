import { Avatar, IconButton, Menu, MenuButton } from "@chakra-ui/react";
import {
  FaBook,
  FaBug,
  FaClock,
  FaCog,
  FaLink,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
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
import { UserRole } from "../../typings/user";

export default function NavMenu() {
  const { fbUser, user, signIn, signOut } = useAuth();

  const navItems: MenuItem[] = [
    user === undefined
      ? new MenuItemGroup([
          new MenuItemOption("Join Now", "/join", <FaUser />),
          new MenuItemOption("Sign In", signIn, <FaSignInAlt />),
        ])
      : new MenuItemOption(
          user?.name,
          `/@${user?.handle}`,
          <Avatar src={user?.photoURL} size="sm" />
        ),
    new MenuItemDivider(),
    new MenuItemGroup(
      [
        new MenuItemOption("Attendance", "/atd", <FaClock />),
        new MenuItemOption("Train", "/train", <FaBook />),
        new MenuItemOption("Settings", "/settings", <FaCog />),
      ],
      UserRole.Member
    ),
    new MenuItemOption(
      "Bug Report",
      "https://github.com/theboi/smp-sstinc-org/issues",
      <FaBug />
    ),
    user !== undefined
      ? new MenuItemOption("Sign Out", signOut, <FaSignOutAlt />)
      : undefined,
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
