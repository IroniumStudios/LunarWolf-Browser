/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';

import {
  StyledNavigationDrawer,
  MenuItems,
  Search,
  Input,
  Title,
  Header,
} from './style';
import { NavigationDrawerItem } from './NavigationDrawerItem';

// Define the prop type for StyledNavigationDrawer to include dense
interface NavigationDrawerProps {
  children?: any;
  title?: string;
  search?: boolean;
  onSearchInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBackClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
  dense?: boolean;
}

// Create a custom type for NavigationDrawer with an Item static property
interface NavigationDrawerComponent extends React.FC<NavigationDrawerProps> {
  Item: typeof NavigationDrawerItem;
}

export const NavigationDrawer: NavigationDrawerComponent = ({
  children,
  title,
  search,
  onSearchInput,
  style,
  dense,
}) => {
  return (
    <StyledNavigationDrawer style={style} dense={dense}>
      {title !== '' && (
        <Header>
          <Title>{title}</Title>
        </Header>
      )}
      {search && (
        <Search>
          <Input placeholder="Search" onInput={onSearchInput} />
        </Search>
      )}
      <MenuItems>{children}</MenuItems>
    </StyledNavigationDrawer>
  );
};

NavigationDrawer.Item = NavigationDrawerItem;
