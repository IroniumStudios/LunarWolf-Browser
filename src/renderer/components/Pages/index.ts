/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import styled, { css } from 'styled-components';

// Define the prop type for Container
interface ContainerProps {
  darken?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  overflow: auto;
  height: 100vh;
  overflow: hidden;

  ${({ darken }) => css`
    &:after {
      opacity: ${darken ? 0.54 : 0};
      pointer-events: ${darken ? 'inherit' : 'none'};
    }
  `}

  &:after {
    content: '';
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: black;
    transition: 0.2s opacity;
  }
`;

export const Content = styled.div`
  height: 100vh;
  flex: 1;
  overflow: auto;
`;

export const LeftContent = styled.div`
  position: relative;
  margin: 64px;
  max-width: 1024px;
`;
