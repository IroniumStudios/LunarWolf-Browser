declare module 'electron-chrome-web-store' {
    import { Session } from 'electron';
    export function setupChromeWebStore(session: Session): void;
  }
  