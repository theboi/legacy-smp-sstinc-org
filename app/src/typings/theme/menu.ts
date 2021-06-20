import {
  MenuItem as ChakraMenuItem,
  MenuGroup,
  MenuDivider,
  Box,
} from "@chakra-ui/react";
import { UserRole } from "../user";

abstract class MenuItem {
  readonly element;
  children?: MenuItem[] | string | undefined;
  minRole?: UserRole;
}

export type MenuAction = (() => void) | string;

export type MenuIcon = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>;

class MenuItemOption extends MenuItem {
  readonly element = ChakraMenuItem;
  action: MenuAction;
  // Allows for any FontAwesome icon or other React element like images
  icon?: MenuIcon;

  constructor(
    children: string,
    action: MenuAction,
    icon?: MenuIcon,
    minRole?: UserRole
  ) {
    super();
    this.action = action;
    this.children = children;
    this.icon = icon;
    this.minRole = minRole;
  }
}

class MenuItemGroup extends MenuItem {
  readonly element = Box;

  constructor(children: MenuItem[], minRole?: UserRole) {
    super();
    this.children = children;
    this.minRole = minRole;
  }
}

/** Only nesting of 1 level is allowed */
class MenuItemNest extends MenuItem {
  readonly element = MenuGroup;
  title: string;

  constructor(title: string, children: MenuItem[], minRole?: UserRole) {
    super();
    this.title = title;
    this.children = children;
    this.minRole = minRole;
  }
}

export type MenuItemGroupable = MenuItemNest | MenuItemGroup;

class MenuItemDivider extends MenuItem {
  readonly element = MenuDivider;

  constructor(minRole?: UserRole) {
    super();
    this.minRole = minRole;
  }
}

export {
  MenuItem,
  MenuItemOption,
  MenuItemGroup,
  MenuItemNest,
  MenuItemDivider,
};
