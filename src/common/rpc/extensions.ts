/* Copyright (c) 2021-2024 Damon Smith */

import { RendererToMainChannel } from '@ironiumstudios/rpc-electron';

export interface ExtensionMainService {
  uninstall(id: string): void;
  inspectBackgroundPage(id: string): void;
}

export const extensionMainChannel =
  new RendererToMainChannel<ExtensionMainService>('ExtensionMainService');
