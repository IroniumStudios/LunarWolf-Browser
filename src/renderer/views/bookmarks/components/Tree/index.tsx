/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import TreeItem from '../TreeItem';
import { StyledTreeView } from './style';

export default observer(() => {
  return (
    <StyledTreeView>
      {store.list
        .filter((r) => r.parent == null)
        .map((item) => (
          <TreeItem key={item._id} data={item} depth={0} />
        ))}
    </StyledTreeView>
  );
});
