import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import useThemeColors from '#hooks/useThemeColors';

interface Props extends PropsWithChildren {}

const ContentWithPaddings: React.FC<Props> = (props) => {
  const { children } = props;
  const { backgroundColor, textColor } = useThemeColors();

  return (
    <Box
      sx={{
        padding: '0 15px',
        height: '100vh',
        background: backgroundColor,
        color: textColor,
      }}
    >
      {children}
    </Box>
  );
};
export default ContentWithPaddings;
