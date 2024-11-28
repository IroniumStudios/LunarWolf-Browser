/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { RendererToMainChannel } from '@wexondrpc-electron';

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
