/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import styled, { css } from 'styled-components';

interface StyledButtonProps {
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
}

export const StyledButton = styled.div<StyledButtonProps>`
  min-width: 80px;
  width: fit-content;
  height: 32px;
  padding: 0px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    position: absolute;
    will-change: opacity;
    transition: 0.2s opacity;
  }

  &:hover::before {
    opacity: 0.12;
  }

  ${({ background = '#2196F3', foreground = '#fff', type }: StyledButtonProps) => css`
    color: ${foreground};
    border: ${type === 'outlined' ? `1px solid ${background}` : 'unset'};
    background-color: ${type === 'outlined' ? 'transparent' : background};

    &::before {
      background-color: ${foreground};
    }
  `};
`;

export const StyledLabel = styled.div`
  z-index: 1;
  font-size: 12px;
  pointer-events: none;
`;
