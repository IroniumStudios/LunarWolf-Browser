/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { configure } from 'mobx';
import { setIpcRenderer } from '@wexondrpc-electron';
import { ipcRenderer } from 'electron';

export const configureUI = () => {
  configure({ enforceActions: 'never' });
};

export const configureRenderer = () => {
  setIpcRenderer(ipcRenderer);
};
