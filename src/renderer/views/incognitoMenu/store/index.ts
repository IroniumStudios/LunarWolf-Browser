/* Copyright (c) 2021-2024 Damon Smith */

import { ipcRenderer, remote } from 'electron';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public constructor() {
    super();
  }
}

export default new Store();
