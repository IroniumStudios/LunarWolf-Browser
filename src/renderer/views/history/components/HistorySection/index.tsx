/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';

import HistoryItem from '../HistoryItem';
import { IHistorySection } from '~/interfaces';
import { EmptySection, SectionTitle } from './style';
import { observer } from 'mobx-react-lite';

export const HistorySection = observer(
  ({ data }: { data: IHistorySection }) => {
    return (
      <EmptySection>
        <SectionTitle>{data.label}</SectionTitle>
        {data.items.map((item) => (
          <HistoryItem key={item._id} data={item} />
        ))}
      </EmptySection>
    );
  },
);
