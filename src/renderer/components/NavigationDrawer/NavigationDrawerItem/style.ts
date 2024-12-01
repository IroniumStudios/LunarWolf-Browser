/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { transparency } from '~/renderer/constants';

// Define props interface for StyledNavigationDrawerItem
interface StyledNavigationDrawerItemProps {
  selected?: boolean;
  theme?: ITheme;
}

export const StyledNavigationDrawerItem = styled.div<StyledNavigationDrawerItemProps>`
  padding: 4px 16px;
  display: flex;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: 0.2s background-color;

  ${({ theme, selected }) => css`
    background-color: ${selected ? 'rgba(0, 0, 0, 0.084)' : 'auto'};

    &:hover {
      background-color: ${!selected
        ? theme?.['pages.lightForeground']
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.04)'
        : 'auto'};
    }

    &:before {
      opacity: ${selected ? 1 : 0};
      background-color: ${theme?.['pages.lightForeground'] ? 'white' : 'black'};
    }
  `};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    border-radius: 2px;
    width: 3px;
    height: 18px;
  }
`;

export const Icon = styled.div`
  height: 24px;
  width: 24px;
  min-width: 24px;
  opacity: ${transparency.icons.inactive};
  margin-right: 16px;
  ${centerIcon(20)};

  ${({ theme }: { theme?: ITheme }) => css`
    filter: ${theme?.['pages.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
`;
