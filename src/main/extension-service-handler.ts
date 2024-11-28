/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { RpcMainEvent, RpcMainHandler } from '@wexondrpc-electron';
import { webContents } from 'electron';
import {
  extensionMainChannel,
  ExtensionMainService,
} from '~/common/rpc/extensions';
import { Application } from './application';
import { URL } from 'url';

export class ExtensionServiceHandler
  implements RpcMainHandler<ExtensionMainService>
{
  constructor() {
    extensionMainChannel.getReceiver().handler = this;
  }

  // Improved to handle both background pages and service workers for Manifest V3.
  inspectBackgroundPage(e: RpcMainEvent, id: string): void {
    const backgroundContent = webContents
      .getAllWebContents()
      .find(
        (x) =>
          x.session === Application.instance.sessions.view &&
          new URL(x.getURL()).hostname === id
      );

    if (backgroundContent) {
      // If it's a traditional background page, open DevTools.
      backgroundContent.openDevTools({ mode: 'detach' });
    } else {
      // Try to find a service worker (it might not always be represented as a webContents).
      this.inspectServiceWorker(id);
    }
  }

  // New method to inspect a service worker
  inspectServiceWorker(id: string): void {
    // Loop through webContents to find any content related to service workers
    const serviceWorker = webContents
      .getAllWebContents()
      .find(
        (x) =>
          x.session === Application.instance.sessions.view &&
          x.getURL().includes(`${id}/service-worker.js`) // Service worker registration script
      );

    if (serviceWorker) {
      // Open DevTools for service workers if found
      serviceWorker.openDevTools({ mode: 'detach' });
    } else {
      console.error(`No service worker found for extension: ${id}`);
    }
  }

  uninstall(e: RpcMainEvent, id: string): void {
    Application.instance.sessions.uninstallExtension(id);
  }
}
