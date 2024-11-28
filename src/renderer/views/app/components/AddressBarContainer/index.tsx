/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { AddressBar } from '../AddressBar';
import { StyledAddressBarContainer } from './style';
import store from '../../store';

export const AddressBarContainer = observer(() => {
  if (!store.addressbarFocused && !store.addressbarEditing) return null;

  return (
    <StyledAddressBarContainer onMouseDown={() => store.inputRef.blur()}>
      <AddressBar />
    </StyledAddressBarContainer>
  );
});
