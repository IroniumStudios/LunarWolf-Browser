/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

export interface IStartupTab {
  id?: number;
  windowId?: number;
  groupId?: number;
  title?: string;
  url?: string;
  favicon?: string;
  order?: number;
  pinned?: boolean;
  isUserDefined?: boolean;
}
