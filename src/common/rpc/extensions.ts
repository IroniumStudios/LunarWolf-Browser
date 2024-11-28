/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { RendererToMainChannel } from '@wexondrpc-electron';

export interface ExtensionMainService {
  uninstall(id: string): void;
  inspectBackgroundPage(id: string): void;
}

export const extensionMainChannel =
  new RendererToMainChannel<ExtensionMainService>('ExtensionMainService');
