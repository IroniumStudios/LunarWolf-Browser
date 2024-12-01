/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import styled from 'styled-components';

export const Root = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  overflow: hidden;
`;

export const StyledRipple = styled.div`
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
  will-change: transform;
`;
