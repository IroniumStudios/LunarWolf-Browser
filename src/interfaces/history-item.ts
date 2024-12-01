/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

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
