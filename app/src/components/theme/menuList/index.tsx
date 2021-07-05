import {
  MenuItem,
  MenuItemGroup,
  MenuItemNest,
  MenuItemOption,
} from "../../../typings/theme/menu";
import { Box, MenuList as ChakraMenuList } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/auth";
import Link from "../link";

export default function MenuList({ menuItems }: { menuItems: MenuItem[] }) {
  const { user } = useAuth();

  return (
    <ChakraMenuList>
      {menuItems.map(function mapNavItems(e, i) {
        if (e === undefined || null) return undefined;
        return (user?.role ?? -1) < e.minRole ? undefined : (
          <MenuListLinkWrapper e={e} key={i}>
            <e.element
              key={i}
              icon={e instanceof MenuItemOption ? e.icon : undefined}
              title={e instanceof MenuItemNest ? e.title : undefined}
            >
              {e instanceof MenuItemGroup || e instanceof MenuItemNest
                ? (e.children as MenuItem[]).map(mapNavItems)
                : (e.children as string)}
            </e.element>
          </MenuListLinkWrapper>
        );
      })}
    </ChakraMenuList>
  );
}

const MenuListLinkWrapper = ({
  e,
  children,
}: {
  e: MenuItem;
  children: React.ReactNode;
}) => {
  if (
    e instanceof MenuItemOption &&
    (e.action instanceof String || typeof e.action === "string")
  ) {
    return <Link href={e.action as string}>{children}</Link>;
  }
  return (
    <Box
      onClick={e instanceof MenuItemOption ? (e.action as () => void) : null}
    >
      {children}
    </Box>
  );
};
