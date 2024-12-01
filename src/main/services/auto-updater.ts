/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';
import { Application } from '../application';

export const runAutoUpdaterService = () => {
  let updateAvailable = false;

  ipcMain.on('install-update', () => {
    if (process.env.NODE_ENV !== 'development') {
      autoUpdater.quitAndInstall(true, true);
    }
  });

  ipcMain.handle('is-update-available', () => {
    return updateAvailable;
  });

  ipcMain.on('update-check', async () => {
    try {
      await autoUpdater.checkForUpdates();
    } catch (e) {
      console.error(e);
    }
  });

  autoUpdater.on('update-downloaded', () => {
    updateAvailable = true;

    for (const window of Application.instance.windows.list) {
      window.send('update-available');
      Application.instance.dialogs
        .getDynamic('menu')
        ?.webContentsView?.webContents?.send('update-available');
    }
  });
};
