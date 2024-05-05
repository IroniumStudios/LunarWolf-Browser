import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'lunarwolf-light') return lightTheme;
  else if (name === 'lunarwolf-dark') return darkTheme;
  return lightTheme;
};
