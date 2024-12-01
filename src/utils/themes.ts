import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'ironiumstudios-light') return lightTheme;
  else if (name === 'ironiumstudios-dark') return darkTheme;
  return lightTheme;
};
