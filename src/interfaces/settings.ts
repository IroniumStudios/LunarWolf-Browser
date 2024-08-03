/* Copyright (c) 2021-2024 Damon Smith */

export interface ISearchEngine {
  name?: string;
  url?: string;
  keywordsUrl?: string;
  keyword?: string;
  icon?: string;
}

export interface IStartupBehavior {
  type: 'continue' | 'urls' | 'empty';
}

export type TopBarVariant = 'default' | 'compact';

export interface ISettings {
  hardwareacceleration: boolean;
  invisibleTabs: any;
  theme: string;
  themeAuto: boolean;
  shield: boolean;
  multrin: boolean;
  notnew: boolean;
  httpsEnforce: boolean;
  animations: boolean;
  bookmarksBar: boolean;
  suggestions: boolean;
  searchEngine: number;
  newtab: {
    news: boolean;
    weather: boolean;
  };
  searchEngines: ISearchEngine[];
  startupBehavior: IStartupBehavior;
  warnOnQuit: boolean;
  version: number;
  darkContents: boolean;
  downloadsDialog: boolean;
  downloadsPath: string;
  ignoreCertificate: boolean;
  autoplay: boolean;
  doNotTrack: boolean;
  topBarVariant: TopBarVariant;
  globalPrivacyControl: boolean;
}
