/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { ipcMain, app, crashReporter, webContents } from 'electron';
import { setIpcMain } from '@wexondrpc-electron';
setIpcMain(ipcMain);

console.log(app.getPath('crashDumps'))
crashReporter.start({ submitURL: '', uploadToServer: false })

require('@electron/remote/main').initialize();

if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install();
}

import { platform } from 'os';
import { Application } from './application';

export const isProduction = app.name === 'LunarWolf';

export const isNightly = app.name === 'lunarwolf-nightly';

app.name = isNightly ? 'LunarWolf Nightly' : 'LunarWolf';

app.commandLine.appendSwitch('new-canvas-2d-api');
app.commandLine.appendSwitch('enable-local-file-accesses');
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('enable-ui-devtools');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-webgl-draft-extensions');
app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('enable-browser-side-compositing');
app.commandLine.appendSwitch('enable-smooth-scrolling');
app.commandLine.appendSwitch('enable-experimental-web-platform-features');
app.commandLine.appendSwitch('fast-tab-windows-close');
app.commandLine.appendSwitch('enable-tab-discarding');
app.commandLine.appendSwitch('enable-use-zoom-for-dsf');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('enable-begin-frame-scheduling');
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('enable-oop-rasterization');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('enable-gpu-sandbox');
app.commandLine.appendSwitch('enable-accelerated-video-decoding');

(process.env as any)['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

app.commandLine.appendSwitch('--enable-transparent-visuals');
app.commandLine.appendSwitch(
  'enable-features',
  'CSSColorSchemeUARendering, ImpulseScrollAnimations, ParallelDownloading',
);

if (process.env.NODE_ENV === 'development') {
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
}

ipcMain.setMaxListeners(0);

const application = Application.instance;
(async () => {
  await application.start();
})();

process.on('uncaughtException', (error) => {
  console.error(error);
});

app.on('window-all-closed', () => {
  if (platform() !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('get-webcontents-id', (e) => {
  e.returnValue = e.sender.id;
});

ipcMain.on('get-window-id', (e) => {
  e.returnValue = (e.sender as any).windowId;
});

ipcMain.handle(
  `web-contents-call`,
  async (e, { webContentsId, method, args = [] }) => {
    try {
      const wc = webContents.fromId(webContentsId);
      const result = (wc as any)[method](...args);

      if (result) {
        if (result instanceof Promise) {
          return await result;
        }

        return result;
      }
    } catch (e) {
      console.error(e);
    }
  },
);

const extensionServiceWorkers: Electron.WebContents[] = [];

app.on('web-contents-created', (e, webContents) => {
  // We can't check for 'serviceworker' directly, but we can use the 'did-finish-load' or other events
  // to detect when the service worker is likely to be loaded or active.
  
  // Listen for the 'did-finish-load' event to check when a service worker is active
  webContents.on('did-finish-load', () => {
    // Check if the content is related to a service worker script or extension
    if (webContents.getURL().includes('service-worker.js')) {
      extensionServiceWorkers.push(webContents);
      
      // Keep the service worker alive by monitoring the 'destroyed' event
      webContents.on('destroyed', () => {
        const index = extensionServiceWorkers.indexOf(webContents);
        if (index !== -1) {
          extensionServiceWorkers.splice(index, 1);
        }
      });
    }
  });
});
