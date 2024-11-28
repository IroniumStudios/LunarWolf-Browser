/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Container, Radio, Root, Circle } from './styles';

interface Props {
  selected: boolean;
}

export const RadioButton = observer(({ selected }: Props) => {
  return (
    <Container>
      <Root>
        <Radio defaultChecked={selected} />
        <Circle selected={selected} />
      </Root>
    </Container>
  );
});
