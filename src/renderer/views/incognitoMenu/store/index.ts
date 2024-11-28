/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { ipcRenderer, ipcMain } from 'electron';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public constructor() {
    super();
  }
}

export default new Store();
