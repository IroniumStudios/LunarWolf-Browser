/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as remote from '@electron/remote';

export const getCurrentWindow = () => remote.getCurrentWindow();

export const closeWindow = () => {
  getCurrentWindow().close();
};

export const minimizeWindow = () => {
  getCurrentWindow().minimize();
};

export const maximizeWindow = () => {
  const currentWindow = getCurrentWindow();

  if (currentWindow.isMaximized()) {
    currentWindow.unmaximize();
  } else {
    currentWindow.maximize();
  }
};
