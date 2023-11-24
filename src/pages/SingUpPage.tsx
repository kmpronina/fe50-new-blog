import React, { BaseSyntheticEvent, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import useAuth from '#hooks/useAuth';
// import { useAppDispatch } from '#store/store';
import ContentWithPaddings from '#containers/contentWithPaddings';
import { RouterLocationsEnum } from '#router/Router';
import { activation } from '#api/services/authService/authService';

const SignUpPage: React.FC = () => {
  const { register } = useAuth();
  const navigation = useNavigate();
  // const dispatch = useAppDispatch();

  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [showSecondStep, setShowSecondStep] = useState<boolean>(false);

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [groupValue, setGroupValue] = useState<number>(2);

  const [userId, onChangeUserId] = useReducer(
    (_: string, e: BaseSyntheticEvent) => e.target.value,
    ''
  );
  const [token, onChangeToken] = useReducer(
    (_: string, e: BaseSyntheticEvent) => e.target.value,
    ''
  );

  const handlePasswordValueChange = (e: BaseSyntheticEvent) => {
    setPasswordValue(e.target.value);
  };
  const handleLoginValueChange = (e: BaseSyntheticEvent) => {
    setLoginValue(e.target.value);
  };
  const handleEmailValueChange = (e: BaseSyntheticEvent) => {
    setEmailValue(e.target.value);
  };
  const handleGroupValueChange = (e: BaseSyntheticEvent) => {
    setGroupValue(e.target.value);
  };

  const handleSignUp = async () => {
    const { isSuccess, error } = await register({
      username: loginValue,
      password: passwordValue,
      email: emailValue,
      course_group: groupValue,
    });

    if (!isSuccess) {
      setLoginError(error);
      return;
    }

    setShowSecondStep(true);
  };

  const handleActivate = async () => {
    const { isSuccess } = await activation({ uid: userId, token });

    if (isSuccess) {
      navigation(RouterLocationsEnum.signIn);
    }
  };

  return (
    <ContentWithPaddings>
      <IconButton onClick={() => navigation(RouterLocationsEnum.main)}>
        <ArrowBack />
      </IconButton>

      {!showSecondStep ? (
        <Stack sx={{ gap: '5px' }}>
          <TextField
            label="username"
            placeholder="username"
            value={loginValue}
            onChange={handleLoginValueChange}
          />
          <TextField
            label="password"
            placeholder="password"
            value={passwordValue}
            onChange={handlePasswordValueChange}
          />
          <TextField
            label="email"
            placeholder="email"
            value={emailValue}
            onChange={handleEmailValueChange}
          />
          <TextField
            label="group"
            placeholder="group"
            type="number"
            value={groupValue}
            onChange={handleGroupValueChange}
          />
          {loginError && <Box style={{ color: '#f00' }}>{loginError}</Box>}
          <Button onClick={handleSignUp}>sign up</Button>
        </Stack>
      ) : (
        <Stack>
          <TextField
            label="user id"
            placeholder="user id"
            value={userId}
            onChange={onChangeUserId}
          />
          <TextField
            label="token"
            placeholder="token"
            value={token}
            onChange={onChangeToken}
          />

          <Button onClick={handleActivate}>activate</Button>
        </Stack>
      )}
    </ContentWithPaddings>
  );
};
export default SignUpPage;
