/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { IHistoryItem } from './history-item';

export interface IHistorySection {
  label?: string;
  items?: IHistoryItem[];
  date?: Date;
}
