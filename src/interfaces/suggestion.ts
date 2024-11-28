/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ISuggestion {
  primaryText?: string;
  secondaryText?: string;
  id?: number;
  favicon?: string | IconProp;
  canSuggest?: boolean;
  isSearch?: boolean;
  hovered?: boolean;
  url?: string;
}
