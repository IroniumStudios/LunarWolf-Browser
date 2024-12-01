/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

export interface IOperation {
  scope: string;
}

export interface IFindOperation extends IOperation {
  query: any;
}

export interface IInsertOperation extends IOperation {
  item: any;
}

export interface IRemoveOperation extends IFindOperation {
  multi?: boolean;
}

export interface IUpdateOperation extends IFindOperation, IRemoveOperation {
  value: any;
}
