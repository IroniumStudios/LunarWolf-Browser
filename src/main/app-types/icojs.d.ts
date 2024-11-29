declare module 'icojs' {
    export function parse(data: ArrayBuffer, options?: { type?: 'image/png' }): Promise<{ buffer: ArrayBuffer }[]>;
    export function isICO(data: ArrayBuffer): boolean;
  }
  