/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

import { BrowserWindow, WebContents } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';

// Type definition for the dialog object (including webContents).
interface IDialog {
  webContentsView: {
    webContents: WebContents;
  };

  // The show method, which will be used to display the dialog
  show: () => void;

  // The on method to attach event listeners to the dialog
  on: (event: string, listener: (...args: any[]) => void) => this;

  // The rearrange method to adjust the dialog's layout, if needed
  rearrange: () => void;

  // The hide method to hide the dialog
  hide: () => void;
}

// Function to show the extension dialog
export const showExtensionDialog = (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
  url: string,
  inspect = false,
) => {
  // Check if extensions are enabled before proceeding
  if (!process.env.ENABLE_EXTENSIONS) return;

  let height = 512;
  let width = 512;

  // Create and configure the dialog window using Application instance
  const dialog = Application.instance.dialogs.show({
    name: 'extension-popup',
    browserWindow,
    getBounds: () => ({
      // Dynamically set the position and size of the dialog
      x: x - width + DIALOG_MARGIN,
      y: y - DIALOG_MARGIN_TOP,
      height: Math.min(1024, height),
      width: Math.min(1024, width),
    }),
    onWindowBoundsUpdate: () => dialog?.hide(), // Hide the dialog if bounds are updated
  }) as unknown as IDialog; // Explicitly cast to IDialog to ensure it has the required methods

  if (!dialog) return;

  // Handle window resizing by listening for bounds changes
  dialog.on('bounds', (e: any, w: number, h: number) => {
    width = w;
    height = h;
    dialog.rearrange(); // Rearrange the layout if needed
  });

  // Attach the webview to the dialog and configure settings to enhance security
  dialog.webContentsView.webContents.on(
    'will-attach-webview',
    (e: any, webPreferences: any, params: any) => {
      // Enforce security restrictions for the webview
      webPreferences.sandbox = true;
      webPreferences.nodeIntegration = false; // Disable node integration for security
      webPreferences.contextIsolation = true; // Ensure context isolation for safety
    }
  );

  // Once dialog is loaded, pass the URL and inspect flag to the extension popup
  dialog.on('loaded', (e: any) => {
    e.reply('data', { url, inspect });
  });

  // If the popup's content fails to load, log the error
  dialog.webContentsView.webContents.on('did-fail-load', (e: any, errorCode: number, errorDescription: string) => {
    console.error('Failed to load extension popup content:', errorDescription);
  });

  // Log when the content successfully finishes loading
  dialog.webContentsView.webContents.on('did-finish-load', () => {
    console.log('Extension popup loaded successfully');
  });
};
