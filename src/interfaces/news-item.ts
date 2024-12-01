/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

export interface INewsItem {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
