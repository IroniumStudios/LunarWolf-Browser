/* Copyright (c) 2021-2024 Damon Smith */

import { configure } from 'mobx';
import { setIpcRenderer } from '@ironiumstudios/rpc-electron';
import { ipcRenderer } from 'electron';

export const configureUI = () => {
  configure({ enforceActions: 'never' });
};

export const configureRenderer = () => {
  setIpcRenderer(ipcRenderer);
};
