/* Copyright (c) 2021-2024 lunarwolf Browser Project */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StyledDefaultBrowser,
  StyledDefaultBrowserSection,
  Line,
  ButtonPredeterminado,
  Close as StyledClose,
  HiddenDiv,
} from './style';
import * as os from 'os';
import { ipcRenderer } from 'electron';
import { ICON_CLOSE } from '~/renderer/constants/icons';
import store from '../../store';

function getOS() {
  if (window.navigator.appVersion.indexOf('Win') !== -1) {
    return true;
  } else if (window.navigator.appVersion.indexOf('Linux') !== -1) {
    return true;
  }

  return false;
}

const isDefaultOrShowBanner = (isDefault: any) => {
  if (localStorage.getItem('hide-banner') == '1') return false;
  if (!getOS()) return false;

  return !isDefault;
};

const onButtonClick = () => {
  onCloseClick();
  ipcRenderer.send('open-settings-default');
};

const onCloseClick = () => {
  localStorage.setItem('hide-banner', '1');
  document.getElementById('default').style.display = 'none';
  document.getElementById('Line').style.display = 'none';
};

// Define the Close component to accept an icon prop
type CloseProps = {
  icon: string;
  title: string;
  onClick: () => void;
};

const Close: React.FC<CloseProps> = ({ icon, title, onClick }) => (
  <StyledClose
    icon={icon} // passing icon here
    onClick={onClick}
    title={title}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '4px', // Optional: add padding for better click area
    }}
  >
    <img src={icon} alt="close icon" style={{ width: '16px', height: '16px' }} />
  </StyledClose>
);

export const DefaultBrowser = observer(() => {
  // localStorage.setItem('hide-banner', "0")

  return isDefaultOrShowBanner(store.isDefaultBrowser) ? (
    <>
      <Line id="Line" />
      <StyledDefaultBrowser id="default">
        <StyledDefaultBrowserSection>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: `url(https://github.com/LunarWolf-Browser-Projects/LunarWolf-Browser/blob/main/static/icons/icon.png?raw=true)`,
                width: '21px',
                height: '21px',
                backgroundSize: 'cover',
                margin: '0 20px 0 15px',
                minWidth: '21px',
              }}
            ></div>
            <HiddenDiv>
              lunarwolf is not your default browser; for maximum security and
              privacy, we recommend you to use lunarwolf!
            </HiddenDiv>
            <ButtonPredeterminado onClick={onButtonClick}>
              Set as default!
            </ButtonPredeterminado>
          </div>
          <Close
            icon={ICON_CLOSE} // passing ICON_CLOSE as the icon prop
            title="Don't ask again."
            onClick={onCloseClick}
          />
        </StyledDefaultBrowserSection>
      </StyledDefaultBrowser>
    </>
  ) : null;
});
