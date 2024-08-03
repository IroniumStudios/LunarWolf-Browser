/* Copyright (c) 2021-2024 Damon Smith */

export interface IHistoryItem {
  _id?: string;
  title?: string;
  url?: string;
  date?: number;
  favicon?: string;
  hovered?: boolean;
}

export interface IVisitedItem extends IHistoryItem {
  times: number;
}
