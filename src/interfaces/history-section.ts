/* Copyright (c) 2021-2024 Damon Smith */

import { IHistoryItem } from './history-item';

export interface IHistorySection {
  label?: string;
  items?: IHistoryItem[];
  date?: Date;
}
