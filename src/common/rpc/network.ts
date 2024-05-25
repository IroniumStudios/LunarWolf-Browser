/* Copyright (c) 2021-2024 Damon Smith */

import { RendererToMainChannel } from '@ironiumstudios/rpc-electron';

export interface ResponseDetails {
  statusCode: number;
  data: string;
}

export interface NetworkService {
  request(url: string): Promise<ResponseDetails>;
}

export const networkMainChannel = new RendererToMainChannel<NetworkService>(
  'NetworkService',
);
