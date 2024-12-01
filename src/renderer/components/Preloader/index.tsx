/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { BLUE_500 } from '~/renderer/constants';

// Styled Components
interface StyledPreloaderProps {
  indeterminate?: boolean;
  size?: number;
}

export const StyledPreloader = styled.div<StyledPreloaderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) => size && `width: ${size}px; height: ${size}px;`}
  ${({ indeterminate }) =>
    indeterminate &&
    css`
      animation: rotate 2s linear infinite;
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
`;

interface PathProps {
  color?: string;
  thickness?: number;
  indeterminate?: boolean;
  value?: number;
}

export const Path = styled.circle<PathProps>`
  stroke: ${({ color }) => color || BLUE_500};
  stroke-width: ${({ thickness }) => thickness || 4};
  ${({ indeterminate }) =>
    indeterminate &&
    css`
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite;
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -40px;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -120px;
        }
      }
    `}
  ${({ value, indeterminate }) =>
    !indeterminate &&
    value !== undefined &&
    css`
      stroke-dasharray: ${value * 1.25}, 125;
      stroke-dashoffset: 0;
      transform: rotate(-90deg);
      transform-origin: center;
    `}
`;

// Component
export interface Props {
  style?: React.CSSProperties;
  color?: string;
  thickness?: number;
  size?: number;
  indeterminate?: boolean;
  value?: number;
}

export const Preloader = ({
  style,
  color,
  size = 48,
  thickness = 4,
  value,
  indeterminate = false,
}: Props) => {
  return (
    <div style={style}>
      <StyledPreloader indeterminate={indeterminate} size={size}>
        <svg viewBox="25 25 50 50">
          <Path
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeMiterlimit="10"
            color={color}
            thickness={thickness}
            indeterminate={indeterminate}
            value={value}
          />
        </svg>
      </StyledPreloader>
    </div>
  );
};

Preloader.defaultProps = {
  thickness: 4,
  size: 48,
  color: BLUE_500,
};
