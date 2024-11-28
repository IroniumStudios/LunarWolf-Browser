/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { css } from 'styled-components';

import { body2 } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';

export const Style = css`
  body {
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    ${body2()}
    ${({ theme }: { theme?: ITheme }) => css`
      background-color: ${theme['pages.backgroundColor']};
      color: ${theme['pages.textColor']};
    `};
  }

  * {
    box-sizing: border-box;
  }
`;
