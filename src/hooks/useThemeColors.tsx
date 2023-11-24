import { useContext } from 'react';
import { colors } from '#styles/colors';
import { ThemeContext } from '#store/context/themeContext';

const useThemeColors = () => {
  const { theme } = useContext(ThemeContext);

  return colors[theme];
};

export default useThemeColors;
