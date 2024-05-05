/* Copyright (c) 2021-2024 Damon Smith */

import { observable, computed, makeObservable, makeAutoObservable } from 'mobx';

import { TabsStore } from './tabs';
import { TabGroupsStore } from './tab-groups';
import { AddTabStore } from './add-tab';
import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import { ExtensionsStore } from './extensions';
import { SettingsStore } from './settings';
import { getCurrentWindow } from '../utils/windows';
import { StartupTabsStore } from './startup-tabs';
import { getTheme } from '~/utils/themes';
import { AutoFillStore } from './autofill';
import { IDownloadItem, BrowserActionChangeType } from '~/interfaces';
import { IBrowserAction } from '../models';
import { NEWTAB_URL } from '~/constants/tabs';
import { IURLSegment } from '~/interfaces/urls';
import { BookmarkBarStore } from './bookmark-bar';
import { NETWORK_ERROR_HOST, WEBUI_BASE_URL } from '~/constants/files';

export class Store {
  public settings = new SettingsStore(this);
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public extensions = new ExtensionsStore();
  public startupTabs = new StartupTabsStore(this);
  public tabGroups = new TabGroupsStore(this);
  public autoFill = new AutoFillStore();
  public bookmarksBar = new BookmarkBarStore(this);

  public inputRef: HTMLInputElement;

  public canOpenSearch = false;

  public mouse = {
    x: 0,
    y: 0,
  };

  public windowId = getCurrentWindow().id;

  public barHideTimer = 0;

  public isIncognito = ipcRenderer.sendSync(`is-incognito-${this.windowId}`);

  // Observable
  public addressbarTextVisible = true;

  public addressbarFocused = false;

  public addressbarEditing = false;

  public isAlwaysOnTop = false;

  public isFullscreen = false;

  public isHTMLFullscreen = false;

  public titlebarVisible = false;

  public updateAvailable = false;

  public navigationState = {
    canGoBack: false,
    canGoForward: false,
  };

  public downloadsButtonVisible = false;

  public isUIpage = true;

  public get _isDefaultBrowser() {
    let res = true;
    ipcRenderer.invoke('is-default-browser').then((_) => {
      res = _;
    });

    return res;
  }

  public downloadNotification = false;

  public downloads: IDownloadItem[] = [];

  public isBookmarked = false;

  public zoomFactor = 1;

  @observable
  public isDefaultBrowser = !this._isDefaultBrowser;

  public dialogsVisibility: { [key: string]: boolean } = {
    menu: false,
    'add-bookmark': false,
    zoom: false,
    'extension-popup': false,
    'downloads-dialog': false,
    incognitoMenu: false,
    menuExtra: false,
  };

  public get downloadProgress() {
    const downloading = this.downloads.filter((x) => !x.completed);

    if (downloading.length === 0) return 0;

    const { totalBytes, canceledTotal } = downloading.reduce((prev, cur) => ({
      totalBytes: prev.totalBytes + cur.totalBytes,
      canceledTotal: prev.canceledTotal || cur.canceled
    }), { totalBytes: 0, canceledTotal: false });

    const { receivedBytes, canceledReceived } = downloading.reduce((prev, cur) => ({
      receivedBytes: prev.receivedBytes + cur.receivedBytes,
      canceledReceived: prev.canceledReceived && cur.canceled
    }), { receivedBytes: 0, canceledReceived: false });

    return receivedBytes / totalBytes;
  }

  public get isCompact() {
    return this.settings.object.topBarVariant === 'compact';
  }

  public get theme() {
    return getTheme(this.settings.object.theme);
  }

  public get addressbarValue() {
    const tab = this.tabs.selectedTab;
    if (tab?.addressbarValue != null) return tab?.addressbarValue;
    else if (tab && !tab?.url?.startsWith(NEWTAB_URL))
      return tab.url[tab.url.length - 1] === '/'
        ? tab.url.slice(0, -1)
        : tab.url;
    return '';
  }

  public get addressbarUrlSegments() {
    let capturedText = '';
    let grayOutCaptured = false;
    let hostnameCaptured = false;
    let protocolCaptured = false;
    const segments: IURLSegment[] = [];

    const url = this.addressbarValue;

    const whitelistedProtocols = ['https', 'http', 'ftp', 'wexond'];

    for (let i = 0; i < url.length; i++) {
      const protocol = whitelistedProtocols.find(
        (x) => `${x}:/` === capturedText,
      );
      if (url[i] === '/' && protocol && !protocolCaptured) {
        segments.push({
          value: `${protocol}://`,
          grayOut: true,
        });

        protocolCaptured = true;
        capturedText = '';
      } else if (
        url[i] === '/' &&
        !hostnameCaptured &&
        (protocolCaptured ||
          !whitelistedProtocols.find((x) => `${x}:` === capturedText))
      ) {
        segments.push({
          value: capturedText,
          grayOut: false,
        });

        hostnameCaptured = true;
        capturedText = url[i];
        grayOutCaptured = true;
      } else {
        capturedText += url[i];
      }

      if (i === url.length - 1) {
        segments.push({
          value: capturedText,
          grayOut: grayOutCaptured,
        });
      }
    }

    return segments;
  }

  public constructor() {
    makeObservable(this, {
      addressbarTextVisible: observable,
      addressbarFocused: observable,
      addressbarEditing: observable,
      isAlwaysOnTop: observable,
      isFullscreen: observable,
      isHTMLFullscreen: observable,
      titlebarVisible: observable,
      updateAvailable: observable,
      navigationState: observable,
      downloadsButtonVisible: observable,
      downloadNotification: observable,
      downloads: observable,
      isBookmarked: observable,
      zoomFactor: observable,
      dialogsVisibility: observable,
      addressbarUrlSegments: computed,
      addressbarValue: computed,
      theme: computed,
      isCompact: computed,
      downloadProgress: computed,
      isUIpage: observable,
    });

    ipcRenderer.on('update-navigation-state', (e, data) => {
      this.navigationState = data;
    });

    ipcRenderer.on('is-ui-page', (e, data) => {
      this.isUIpage = data;
    });

    ipcRenderer.on('update-navigation-state-ui', (e, url) => {
      var url = url.url;
      this.isUIpage =
        url.startsWith(WEBUI_BASE_URL) || url.startsWith(NETWORK_ERROR_HOST);
    });

    ipcRenderer.on('fullscreen', (e, fullscreen: boolean) => {
      this.isFullscreen = fullscreen;
    });

    ipcRenderer.on('html-fullscreen', (e, fullscreen: boolean) => {
      this.isHTMLFullscreen = fullscreen;
    });

    ipcRenderer.on('update-available', () => {
      this.updateAvailable = true;
    });

    ipcRenderer.on('download-started', (e, item) => {
      this.downloads.push(item);
      this.downloadsButtonVisible = true;
    });

    ipcRenderer.on('download-progress', (e, item: IDownloadItem) => {
      const i = this.downloads.find((x) => x.id === item.id);
      i.receivedBytes = item.receivedBytes;
    });

    ipcRenderer.on('is-bookmarked', (e, flag) => {
      this.isBookmarked = flag;
    });

    ipcRenderer.on(
      'download-completed',
      (e, id: string, downloadNotification: boolean) => {
        const i = this.downloads.find((x) => x.id === id);
        i.completed = true;

        if (this.downloads.filter((x) => !x.completed).length === 0) {
          this.downloads = [];
        }

        if (downloadNotification) {
          this.downloadNotification = true;
        }
      },
    );

    ipcRenderer.on('find', () => {
      const tab = this.tabs.selectedTab;
      if (tab) {
        ipcRenderer.send(`find-show-${this.windowId}`, tab.id);
      }
    });

    ipcRenderer.on('dialog-visibility-change', (e, name, state) => {
      this.dialogsVisibility[name] = state;
    });

    ipcRenderer.on(`addressbar-update-input`, (e, data) => {
      const tab = this.tabs.getTabById(data.id);

      this.addressbarEditing = false;

      if (tab) {
        tab.addressbarValue = data.text;
        tab.addressbarSelectionRange = [data.selectionStart, data.selectionEnd];

        if (tab.isSelected) {
          this.inputRef.value = data.text;
          this.inputRef.setSelectionRange(
            data.selectionStart,
            data.selectionEnd,
          );

          if (data.focus) {
            remote.getCurrentWebContents().focus();
            this.inputRef.focus();
          }

          if (data.escape) {
            this.addressbarFocused = false;
            this.tabs.selectedTab.addressbarValue = null;

            requestAnimationFrame(() => {
              this.inputRef.select();
            });
          }
        }
      }
    });

    if (process.env.ENABLE_EXTENSIONS) {
      ipcRenderer.on(
        'set-browserAction-info',
        async (e, extensionId, action: BrowserActionChangeType, details) => {
          if (
            this.extensions.defaultBrowserActions.filter(
              (x) => x.extensionId === extensionId,
            ).length === 0
          ) {
            this.extensions.load();
          }

          const handler = (item: IBrowserAction) => {
            if (action === 'setBadgeText') {
              item.badgeText = details.text;
            } else if (action === 'setPopup') {
              item.popup = details.popup;
            } else if (action === 'setTitle') {
              item.title = details.title;
            }
          };

          if (details.tabId) {
            this.extensions.browserActions
              .filter(
                (x) =>
                  x.extensionId === extensionId && x.tabId === details.tabId,
              )
              .forEach(handler);
          } else {
            this.extensions.defaultBrowserActions
              .filter((x) => x.extensionId === extensionId)
              .forEach(handler);
            this.extensions.browserActions
              .filter((x) => x.extensionId === extensionId)
              .forEach(handler);
          }
        },
      );
      ipcRenderer.send('load-extensions');
    }

    ipcRenderer.send('update-check');
  }
}

export default new Store();
