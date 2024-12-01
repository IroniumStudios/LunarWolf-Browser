/* some elements of this code contains lines from Browser Base and other respective projects, all credit goes to them for there work */

export const isVisible = (el: HTMLElement) => {
  return el.offsetHeight !== 0;
};

export const searchElements = <T>(
  el: Document | HTMLElement,
  query: string,
) => {
  return Array.from(el.querySelectorAll(query)) as unknown as T[];
};
