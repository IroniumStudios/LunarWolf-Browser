/* Copyright (c) 2021-2024 Damon Smith */

import styled, { css, DefaultTheme } from 'styled-components';
import { ITheme } from '~/interfaces';
import { centerIcon } from '~/renderer/mixins';
import { ICON_ARROW_RIGHT } from '~/renderer/constants/icons';

type MenuItemProps = {
  arrow?: boolean;
  disabled?: boolean;
};

type IconProps = {
  icon?: string;
  theme?: ITheme;
};

export const Line = styled.div<{ theme?: ITheme }>`
  height: 1px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  border: 1px solid transparent;

  ${({ theme }) => css`
    background-color: ${theme ? theme['dialog.separator.color'] : ''};
  `};
`;

export const MenuItem = styled.div<MenuItemProps>`
  height: 36px;
  align-items: center;
  display: flex;
  position: relative;
  padding: 0 12px;
  font-size: 12px;

  ${({ arrow }) =>
    arrow &&
    css`
      &:after {
        content: '';
        position: absolute;
        right: 4px;
        width: 24px;
        height: 100%;
        opacity: 0.54;
        ${centerIcon(20)};
        background-image: url(${ICON_ARROW_RIGHT});
      }
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.54;
    `};

  &:hover {
    ${({ theme }) => css`
      background-color: ${theme && theme['dialog.lightForeground']
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.03)'};
    `};
  }
`;

export const Label = styled.div`
  font-size: 16px;
  min-width: 45px;
  text-align: center;
`;

export const MenuItemZoom = styled(MenuItem)``;

export const MenuItemTitle = styled.div`
  flex: 1;
`;

export const MenuItems = styled.div<{ theme?: ITheme }>`
  flex: 1;
  overflow: hidden;
  padding-top: 4px;
  padding-bottom: 4px;

  ${({ theme }) => css`
    background-color: ${theme ? theme['dialog.backgroundColor'] : ''};
    color: ${theme ? theme['dialog.textColor'] : ''};
  `};
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;

export const Icon = styled.div<IconProps>`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  ${centerIcon()};
  opacity: 0.8;

  ${({ icon, theme }) => css`
    background-image: url(${icon});
    filter: ${theme && theme['dialog.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
`;

export const RightControl = styled.div`
  margin-right: 18px;
`;

export const Shortcut = styled(RightControl)`
  opacity: 0.54;
`;