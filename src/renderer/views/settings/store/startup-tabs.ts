/* Copyright (c) 2021-2024 Damon Smith */

import { makeObservable, observable } from 'mobx';

import { IStartupTab } from '~/interfaces/startup-tab';
import { PreloadDatabase } from '~/preloads/models/database';

export class StartupTabsStore {
  public db = new PreloadDatabase<IStartupTab>('startupTabs');

  public isLoaded = false;

  public list: IStartupTab[] = [];

  constructor() {
    makeObservable(this, {
      list: observable,
    });
  }

  public async load() {
    if (this.isLoaded) return;

    this.isLoaded = true;
    this.list = await this.db.get({});
  }

  public async addStartupDefaultTabItems(items: IStartupTab[]) {
    this.db.remove({ isUserDefined: true }, true);
    this.list = this.list.filter((x) => !x.isUserDefined);
    items
      .filter((x) => x.url !== undefined && x.url.length > 1)
      .forEach(async (x) => {
        this.list.push(await this.db.insert(x));
      });
  }

  public clearUserDefined() {
    this.db.remove({ isUserDefined: true }, true);
    this.list = this.list.filter((x) => !x.isUserDefined);
  }

  public clearStartupTabs(removePinned: boolean, removeUserDefined: boolean) {
    if (removePinned && removeUserDefined) {
      this.db.remove({}, true);
      this.list = [];
    } else if (!removePinned) {
      this.db.remove({ pinned: false }, true);
      this.list = this.list.filter((x) => x.pinned);
    } else if (!removeUserDefined) {
      this.db.remove({ isUserDefined: false }, true);
      this.list = this.list.filter((x) => x.isUserDefined);
    } else {
      this.db.remove({ isUserDefined: false, pinned: false }, true);
      this.list = this.list.filter((x) => x.isUserDefined || x.pinned);
    }
  }
}
