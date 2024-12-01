/* some elements of this code contain lines from Browser Base and other respective projects, all credit goes to them for their work */

import { existsSync, promises as fs } from 'fs';
import { resolve, join } from 'path';
import fetch from 'node-fetch';

import { ElectronBlocker, Request } from '@ghostery/adblocker-electron';
import { getPath } from '~/utils';
import { Application } from '../application';
import { ipcMain, Session } from 'electron';

export let engine: ElectronBlocker;

const PRELOAD_PATH = join(__dirname, './preload.js');

const loadFilters = async () => {
  // Fetch and validate the cache path
  let cachePath = getPath('adblock/cache.dat');
  
  // Log the cachePath to understand its format
  console.log('Cache Path:', cachePath); 

  // If it's a number or other unexpected type, convert it to a string
  if (typeof cachePath !== 'string') {
    console.error(`Expected a string for cache path, but received ${typeof cachePath}`);
    cachePath = String(cachePath);  // Convert it to a string (if not already)
  }
  
  const path = resolve(cachePath);  // Resolve to absolute path

  const downloadFilters = async () => {
    engine = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);

    try {
      await fs.writeFile(path, engine.serialize());
    } catch (err) {
      console.error(err);
    }
  };

  if (existsSync(path)) {
    try {
      const buffer = await fs.readFile(path);

      try {
        engine = ElectronBlocker.deserialize(buffer);
      } catch (e) {
        await downloadFilters();
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    await downloadFilters();
  }
};

const emitBlockedEvent = (request: Request) => {
  const win = Application.instance.windows.findByContentView(request.tabId);
  if (!win) return;
  const view = win.viewManager.views.get(request.tabId);
  if (view) {
    view.emitEvent('blocked-ad');
  }
};

let adblockRunning = false;
let adblockInitialized = false;

interface IAdblockInfo {
  headersReceivedHandler?: (details: any, callback: any) => void;
  beforeRequestHandler?: (details: any, callback: any) => void;
}

const sessionAdblockInfoMap: Map<Session, IAdblockInfo> = new Map();

export const runAdblockService = async (ses: Session) => {
  if (!adblockInitialized) {
    adblockInitialized = true;
    await loadFilters();
  }

  if (adblockInitialized && !engine) {
    return;
  }

  if (adblockRunning) return;

  adblockRunning = true;

  const info = sessionAdblockInfoMap.get(ses) || {};

  // Handlers for web requests
  const headersReceivedHandler = (details: any, callback: any) => {
    engine.onHeadersReceived(details, callback);
  };

  const beforeRequestHandler = (details: any, callback: any) => {
    engine.onBeforeRequest(details, callback);
  };

  if (!info.headersReceivedHandler) {
    ses.webRequest.onHeadersReceived({ urls: ['<all_urls>'] }, headersReceivedHandler);
    info.headersReceivedHandler = headersReceivedHandler;
  }

  if (!info.beforeRequestHandler) {
    ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, beforeRequestHandler);
    info.beforeRequestHandler = beforeRequestHandler;
  }

  sessionAdblockInfoMap.set(ses, info);

  ipcMain.on('get-cosmetic-filters', (event) => {
    if (engine && typeof engine.getCosmeticsFilters === 'function') {
      const filters = engine.getCosmeticsFilters();
      event.returnValue = filters;
    }
  });

  ipcMain.on('is-mutation-observer-enabled', (event) => {
    if (engine && typeof engine.onIsMutationObserverEnabled === 'function') {
      const isEnabled = engine.onIsMutationObserverEnabled();
      event.returnValue = isEnabled;
    }
  });

  const preloads = ses.getPreloads();
  ses.setPreloads([...preloads, PRELOAD_PATH]);

  engine.on('request-blocked', emitBlockedEvent);
  engine.on('request-redirected', emitBlockedEvent);
};

export const stopAdblockService = (ses: Session) => {
  if (!adblockRunning) return;

  adblockRunning = false;

  const info = sessionAdblockInfoMap.get(ses) || {};

  if (info.beforeRequestHandler) {
    ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, null);
    info.beforeRequestHandler = undefined;
  }

  if (info.headersReceivedHandler) {
    ses.webRequest.onHeadersReceived({ urls: ['<all_urls>'] }, null);
    info.headersReceivedHandler = undefined;
  }

  ses.setPreloads(ses.getPreloads().filter((p: string) => p !== PRELOAD_PATH));

  sessionAdblockInfoMap.delete(ses);
};
