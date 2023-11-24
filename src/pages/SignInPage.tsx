import React, { BaseSyntheticEvent, useState } from 'react';
import { Box, TextField, IconButton, Button, Stack } from '@mui/material';
import ContentWithPaddings from '#containers/contentWithPaddings';
import {
  LoginFailureReturnType,
  LoginReturnType,
  LoginSuccessReturnType,
} from '#api/services/authService/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '#store/store';
import { RouterLocationsEnum } from '#router/Router';
import { ArrowBack } from '@mui/icons-material';
import { setLocalStorageWithTime } from '#utils/addTimeToExpireToStorage';
import { login } from '#api/services/authService/authService';
import {
  setAccessTokenToStore,
  setUserDataToStore,
} from '#store/reducers/userReducer/actions';

const isLoginFailure = (
  loginData: LoginReturnType
): loginData is LoginFailureReturnType => {
  if ((loginData as LoginFailureReturnType)?.detail) {
    return true;
  }

  return false;
};

const SignInPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const handlePasswordValueChange = (e: BaseSyntheticEvent) => {
    setPasswordValue(e.target.value);
  };
  const handleLoginValueChange = (e: BaseSyntheticEvent) => {
    setLoginValue(e.target.value);
  };

  const handleLogin = async () => {
    const loginReturnData = await login({
      email: loginValue,
      password: passwordValue,
    });

    if (isLoginFailure(loginReturnData)) {
      setLoginError('creds');
      return;
    }

    const loginSuccess = loginReturnData as LoginSuccessReturnType;
    setLocalStorageWithTime('refreshToken', loginSuccess.refresh, 30000000);
    setLocalStorageWithTime('authToken', loginSuccess.access, 30000);

    dispatch(
      setUserDataToStore({ email: loginValue, password: passwordValue })
    );

    dispatch(setAccessTokenToStore(loginSuccess.access));
    navigation(RouterLocationsEnum.blogPage);
  };

  return (
    <ContentWithPaddings>
      <IconButton onClick={() => navigation(RouterLocationsEnum.main)}>
        <ArrowBack />
      </IconButton>
      <Stack sx={{ gap: '5px' }}>
        <TextField
          value={loginValue}
          label={'Email'}
          onChange={handleLoginValueChange}
        />
        <TextField
          value={passwordValue}
          label={'Password'}
          onChange={handlePasswordValueChange}
        />
        {loginError && <Box style={{ color: '#f00' }}>{loginError}</Box>}
        <Button onClick={handleLogin}>sign in</Button>
      </Stack>
    </ContentWithPaddings>
  );
};
export default SignInPage;
