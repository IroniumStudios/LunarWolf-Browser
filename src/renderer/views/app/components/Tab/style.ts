import styled, { css } from 'styled-components';

import { transparency, ICON_CLOSE } from '~/renderer/constants';
import { ITheme } from '~/interfaces';
import { centerIcon } from '~/renderer/mixins';
import { TAB_PINNED_WIDTH } from '../../constants';

interface CloseProps {
  visible: boolean;
  theme: ITheme;
}

export const StyledClose = styled.div<CloseProps>`
  height: 20px;
  width: 20px;
  margin-left: 2px;
  margin-right: 6px;
  border-radius: 2px;
  background-image: url('${ICON_CLOSE}');
  transition: 0.1s background-color;
  z-index: 10;
  ${centerIcon(16)};

  ${({ visible, theme }) => css`
    opacity: ${visible ? transparency.icons.inactive : 0};
    display: ${visible ? 'block' : 'none'};
    filter: ${theme['toolbar.lightForeground'] ? 'invert(100%)' : 'none'};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface ActionProps {
  visible: boolean;
  icon: string;
  theme: ITheme;
}

export const StyledAction = styled.div<ActionProps>`
  height: 20px;
  width: 20px;
  margin-left: 2px;
  border-radius: 2px;
  transition: 0.1s background-color;
  z-index: 10;
  ${centerIcon(16)};

  ${({ visible, theme, icon }) => css`
    opacity: ${visible ? transparency.icons.inactive : 0};
    display: ${visible ? 'block' : 'none'};
    filter: ${theme['toolbar.lightForeground'] ? 'invert(100%)' : 'none'};
    background-image: url('${icon}');
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface PinActionProps {
  visible: boolean;
  icon: string;
  theme: ITheme;
}

export const StyledPinAction = styled.div<PinActionProps>`
  height: 12px;
  width: 12px;
  border-radius: 100%;
  transition: 0.1s background-color;
  z-index: 10;
  position: fixed;
  right: 8px;
  top: 8px;
  ${centerIcon(10)};

  ${({ visible, theme, icon }) => css`
    display: ${visible ? 'block' : 'none'};
    background-color: ${theme['toolbar.lightForeground']
      ? 'rgb(255, 255, 255)'
      : 'rgb(0, 0, 0)'};
    background-image: url('${icon}');
  `}

  &:hover {
    filter: invert(100%);
  }
`;

interface TabProps {
  selected: boolean;
}

export const StyledTab = styled.div<TabProps>`
  position: absolute;
  height: 100%;
  width: 0;
  left: 0;
  will-change: width, transform;
  -webkit-app-region: no-drag;
  display: flex;
  backface-visibility: hidden;

  ${({ selected }) => css`
    z-index: ${selected ? 2 : 1};
  `};
`;

interface TitleProps {
  isIcon: boolean;
  selected: boolean;
  theme: ITheme;
}

export const StyledTitle = styled.div<TitleProps>`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.2s margin-left;
  margin-left: 8px;
  min-width: 0;
  flex: 1;

  ${({ isIcon, selected, theme }) => css`
    margin-left: ${!isIcon ? 0 : 12}px;
    color: ${selected
      ? theme['tab.selected.textColor']
      : theme['tab.textColor']};
  `};
`;

interface IconProps {
  isIconSet: boolean;
}

export const StyledIcon = styled.div<IconProps>`
  height: 16px;
  min-width: 16px;
  transition: 0.2s opacity, 0.2s min-width; /* Updated transition */
  ${centerIcon()};
  
  ${({ isIconSet }) => css`
    min-width: ${isIconSet ? 16 : 0}px; /* Ensure space for the icon */
    opacity: ${isIconSet ? 1 : 0}; /* Proper visibility toggle */
  `};
`;

export const StyledContent = styled.div`
  overflow: hidden;
  z-index: 2;
  align-items: center;
  display: flex;
  margin-left: 10px;
  flex: 1;
`;

interface TabContainerProps {
  pinned: boolean;
  theme: ITheme;
  hasTabGroup: boolean;
  selected: boolean;
}

export const TabContainer = styled.div<TabContainerProps>`
  position: relative;

  width: 100%;
  align-items: center;
  overflow: hidden;
  display: flex;
  backface-visibility: hidden;
  transition: 0.1s background-color;
  border-bottom: transparent !important;
  border: 2px solid;

  ${({ pinned, theme, hasTabGroup, selected }) => css`
    max-width: ${pinned ? `${TAB_PINNED_WIDTH}px` : '100%'};
    margin-top: ${theme.tabMarginTop}px;
    height: ${theme.tabHeight}px;
    border-radius: ${theme.isCompact && !hasTabGroup ? '4px' : 'auto'};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: ${selected ? '0px 0px 6px 0px rgba(0,0,0,0.12)' : 'none'};
  `};
`;
