/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import * as React from 'react';

import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react-lite';
import { NormalButton } from '../App';

const TogglehttpsEnforce = observer(() => {
  const { httpsEnforce } = store.settings;

  return (
    <Row onClick={onSwitchChange('httpsEnforce')}>
      <Title>Show search and site suggestions</Title>
      <Control>
        <Switch value={httpsEnforce} />
      </Control>
    </Row>
  );
});

export const Other = () => {
  return (
    <>
      <Header>Other Settings</Header>
      <Title>
        Here, you can view all other settings that are not sorted into
        categories.
      </Title>
      <TogglehttpsEnforce />
    </>
  );
};
