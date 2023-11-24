import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { RouterLocationsEnum } from '#router/Router';
import ContentWithPaddings from '#containers/contentWithPaddings';
import useThemeColors from '#hooks/useThemeColors';

const MainPage: React.FC = () => {
  const navigation = useNavigate();

  const { buttonBgColor, buttonTextColor } = useThemeColors();

  return (
    <ContentWithPaddings>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          gap: '25px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant={'outlined'}
          sx={{
            fontSize: '24px',
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
            borderColor: buttonTextColor,
          }}
          onClick={() => navigation(RouterLocationsEnum.signIn)}
        >
          Sign In
        </Button>
        <Button
          variant={'outlined'}
          sx={{ fontSize: '24px' }}
          onClick={() => navigation(RouterLocationsEnum.signUp)}
        >
          Sign Up
        </Button>
      </Box>
    </ContentWithPaddings>
  );
};

export default MainPage;
