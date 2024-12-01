/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import {
  StyledApp,
  MenuItem,
  MenuItems,
  Content,
  Icon,
  MenuItemTitle,
  Text,
  MenuItemIcon,
} from './style';
import { UIStyle } from '~/renderer/mixins/default-styles';
import store from '../../store';
import { ICON_INCOGNITO, ICON_CLOSE } from '~/renderer/constants/icons';
import { ipcRenderer } from 'electron';

const onClick = () => {
  ipcRenderer.send(`window-close-${store.windowId}`);
};

export const App = observer(() => {
  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['dialog.lightForeground'] }}
    >
      <StyledApp style={{ marginRight: '85px', marginTop: '5px' }}>
        <UIStyle />
        <Content>
          <Icon>
            {/* Ensure ICON_INCOGNITO is used properly here */}
            <img src={ICON_INCOGNITO} alt="Incognito Icon" />
          </Icon>
          <Text>You are in Incognito mode</Text>
        </Content>
        <MenuItems>
          <MenuItem>
            <MenuItemIcon>
              {/* Ensure ICON_CLOSE is used properly here */}
              <img src={ICON_CLOSE} alt="Close Icon" />
            </MenuItemIcon>
            <MenuItemTitle onClick={onClick}>
              Leave Incognito Mode!
            </MenuItemTitle>
          </MenuItem>
        </MenuItems>
      </StyledApp>
    </ThemeProvider>
  );
});
