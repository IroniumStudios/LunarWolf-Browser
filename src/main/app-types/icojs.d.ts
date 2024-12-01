declare module 'icojs' {
  export function parse(data: ArrayBuffer, options?: { type?: 'image/png' }): Promise<{ buffer: ArrayBuffer; width: number; height: number; bpp: number }[]>;
  export function isICO(data: ArrayBuffer): boolean;

  // Corrected parseICO function
  export function parseICO(icoData: Buffer, type: 'image/png'): Promise<{ buffer: ArrayBuffer; width: number; height: number; bpp: number }[]>;
}
