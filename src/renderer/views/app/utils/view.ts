/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import store from '../store';

export const loadURL = (url: string) => {
  const tab = store.tabs.selectedTab;

  if (!tab) {
    store.tabs.addTab({ url, active: true });
  } else {
    tab.url = url;
    try {
      tab.callViewMethod('loadURL', url);
    } catch (e) {
      console.error(e);
    }
  }
};
