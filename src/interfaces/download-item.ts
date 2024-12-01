/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

export interface IDownloadItem {
  paused: any;
  canceled: any;
  fileName?: string;
  receivedBytes?: number;
  totalBytes?: number;
  savePath?: string;
  id?: string;
  completed?: boolean;
}
