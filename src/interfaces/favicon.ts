export interface IFavicon {
  url?: string;
  data?: string;
  _id?: string;
  png?: string; // PNG image data
  jpg?: string; // JPG image data
  jpeg?: string; // JPEG image data
  gif?: string; // GIF image data
  svg?: string; // SVG image data
  [key: string]: string | undefined;
}