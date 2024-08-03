/* Copyright (c) 2021-2024 Damon Smith */

export type BrowserActionChangeType =
  | 'setPopup'
  | 'setBadgeText'
  | 'setTitle'
  | 'setColor'
  | 'setIcon'
  | 'setBadgeBackgroundColor';

export const BROWSER_ACTION_METHODS: BrowserActionChangeType[] = [
  'setPopup',
  'setBadgeText',
  'setTitle',
  'setColor',
  'setIcon',
  'setBadgeBackgroundColor',
];
