/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

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
