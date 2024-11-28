/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';

import { StyledButton, StyledLabel } from './styles';

interface Props {
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export const Button = ({
  background,
  foreground,
  type,
  onClick,
  children,
  style,
}: Props) => (
  <StyledButton
    className="button"
    style={{
      background,
      color: foreground,
      ...style,
    }}
    data-type={type}
    onClick={onClick}
  >
    <StyledLabel>{children}</StyledLabel>
  </StyledButton>
);
