/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

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
