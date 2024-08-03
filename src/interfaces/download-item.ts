/* Copyright (c) 2021-2024 Damon Smith */

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
