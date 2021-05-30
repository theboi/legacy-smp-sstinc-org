import { MenuButton } from "@chakra-ui/react";
import { MenuList } from "@chakra-ui/react";
import { MenuItem } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MenuDivider } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { User, UserRole } from "../../services/userold";

interface NavLink {
  minRole?: UserRole;
  isDivider?: boolean;
  name?: string;
  // Allows for any FontAwesome icon or other React element like images
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  action?: (() => void) | string;
}

export const NavBar = (props: { user: User; links: NavLink[] }) => {
  const router = useRouter();

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
        {props.links.map((e, i) => {
          if (props.user?.role < e.minRole) return null;
          else if (e.isDivider) return <MenuDivider key={i} />;
          return (
            <MenuItem
              key={i}
              onClick={
                typeof e.action === "string" || e.action instanceof String
                  ? () => router.push(e.action as string)
                  : e.action
              }
              icon={e.icon}
            >
              {e.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
