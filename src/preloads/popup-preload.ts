/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { ipcRenderer } from 'electron';

const updateBounds = () => {
  ipcRenderer.sendToHost(
    'webview-size',
    document.body.offsetWidth || document.body.scrollWidth,
    document.body.offsetHeight || document.body.scrollHeight,
  );
};

window.addEventListener('load', () => {
  updateBounds();

  // @ts-ignore
  const resizeObserver = new ResizeObserver(() => {
    updateBounds();
  });

  resizeObserver.observe(document.body);
});

const close = () => {
  ipcRenderer.sendToHost('webview-blur');
};

window.addEventListener('blur', close);

window.close = close;
