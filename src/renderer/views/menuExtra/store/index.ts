/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { ipcRenderer, ipcMain, BrowserWindow } from 'electron';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public data = {};

  public constructor() {
    super();

    makeObservable(this, {});

    // this.init();

    ipcRenderer.on('data', (e: any, _data: any) => {
      const { url, title, bookmark, favicon, browserWindow } = _data;
      this.data = {
        url,
        title,
        bookmark,
        favicon,
      };
    });
  }

  public async capturePage() {
    // Access the current window via the renderer's window object
    const currentWindow = BrowserWindow.getFocusedWindow();

    if (currentWindow) {
      const img = await currentWindow.capturePage();
      return img.toDataURL();
    }
    throw new Error("No focused window found.");
  }

  // public async init() {  }

  public async save() {
    ipcRenderer.send('save-settings', {
      settings: JSON.stringify(this.settings),
    });
  }
}

export default new Store();
