import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Line,
  MenuItem,
  MenuItems,
  Content,
  Icon,
  MenuItemTitle,
  Shortcut,
  RightControl,
} from './style';
import store from '../../store';
import { ipcRenderer, shell } from 'electron';
import * as copy from 'copy-to-clipboard';
import {
  ICON_FIRE,
  ICON_TOPMOST,
  ICON_TAB,
  ICON_WINDOW,
  ICON_STAR,
  ICON_SETTINGS,
  ICON_VOLUME_HIGH,
  ICON_DOWNLOAD,
  ICON_FIND,
  ICON_PRINT,
} from '~/renderer/constants/icons';
import { getWebUIURL } from '~/common/webui';

interface StoreData {
  url: string;
}

const onPrintClick = () => {
  ipcRenderer.send('Print', null);
  store.hide();
};

const onFindInPageClick = () => {
  ipcRenderer.send(`find-in-page-${store.windowId}`);
  store.hide();
};

const addNewTab = (url: string) => {
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url,
    active: true,
  });
  store.hide();
};

const goToWebUIPage = (name: string) => () => {
  addNewTab(getWebUIURL(name));
};

const goToURL = (url: string) => () => {
  addNewTab(url);
};

const onDuplicateTab = () => {
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url: (store.data as StoreData).url,
    active: true,
  });
};

const guardarComo = () => {
  ipcRenderer.send('save-as-menu-extra');
};

const copiarUrl = async () => {
  await copy((store.data as StoreData).url);
  store.hide();
};

const shareUrl = () => {
  shell.openExternal(
    'mailto:?subject=Shared From lunarwolf Browser&body=' + (store.data as StoreData).url,
  );
};

const capture = async () => {
  copy(await store.capturePage());
};

interface IconProps {
  icon: string;
}

export const QuickMenu = observer(() => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <Content>
        <MenuItems>
          <MenuItem style={{ cursor: 'pointer' }} onClick={onDuplicateTab}>
            <Icon icon={ICON_TAB as IconProps['icon']} />
            <MenuItemTitle>Duplicate tab</MenuItemTitle>
          </MenuItem>
          <Line />
          <MenuItem style={{ cursor: 'pointer' }} onClick={copiarUrl}>
            <Icon icon={ICON_TOPMOST as IconProps['icon']} />
            <MenuItemTitle>Copy link</MenuItemTitle>
          </MenuItem>
          <MenuItem style={{ cursor: 'pointer' }} onClick={shareUrl}>
            <Icon icon={ICON_STAR as IconProps['icon']} />
            <MenuItemTitle>Share</MenuItemTitle>
          </MenuItem>
          <Line />
          <MenuItem style={{ cursor: 'pointer' }} onClick={guardarComo}>
            <Icon icon={ICON_DOWNLOAD as IconProps['icon']} />
            <MenuItemTitle>Save as</MenuItemTitle>
            <Shortcut>Ctrl+S</Shortcut>
          </MenuItem>
          <Line />
          <MenuItem disabled={true} style={{ cursor: 'pointer' }}>
            <Icon icon={ICON_VOLUME_HIGH as IconProps['icon']} />
            <MenuItemTitle>Read out loud</MenuItemTitle>
          </MenuItem>
          <Line />
          <MenuItem style={{ cursor: 'pointer' }} onClick={onFindInPageClick}>
            <Icon icon={ICON_FIND as IconProps['icon']} />
            <MenuItemTitle>Find on the page</MenuItemTitle>
            <Shortcut>Ctrl+F</Shortcut>
          </MenuItem>
          <MenuItem style={{ cursor: 'pointer' }} onClick={onPrintClick}>
            <Icon icon={ICON_PRINT as IconProps['icon']} />
            <MenuItemTitle>Print</MenuItemTitle>
            <Shortcut>Ctrl+P</Shortcut>
          </MenuItem>
        </MenuItems>
      </Content>
    </div>
  );
});
