/* Copyright (c) 2021-2024 Damon Smith */

export interface IBookmark {
  _id?: string;
  title?: string;
  url?: string;
  favicon?: string;
  hovered?: boolean;
  isFolder?: boolean;
  parent?: string;
  order?: number;
  expanded?: boolean;
  static?: 'mobile' | 'main' | 'other' | 'pinned';
  children?: string[];
}
