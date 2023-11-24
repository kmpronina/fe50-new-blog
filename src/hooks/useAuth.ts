import { SignUpDataType } from '#api/services/authService/types';
// import {
//   getLocalStorageWithTime,
//   setLocalStorageWithTime,
// } from '#utils/addTimeToExpireToStorage';
import { signUp } from '#api/services/authService/authService';

// type UserDataHash = {
//   loginHash: string;
//   passwordHash: string;
// };

export type AuthMethodsReturnType = {
  isSuccess: boolean;
  error?: string;
};

// const signUpLocal = ({
//   username,
//   password,
//   email,
//   course_group,
// }: SignUpDataType) => {
//   const authToken = md5(`${username}|${password}|${email}|${course_group}`);
//   const refreshToken = md5(
//     `${authToken}|${username}|${password}|${email}|${course_group}`
//   );

//   return { authToken, refreshToken };
// };

const useAuth = () => {
  const register = async (
    data: SignUpDataType
  ): Promise<AuthMethodsReturnType> => {
    const responseData = await signUp(data);

    return {
      isSuccess: !(responseData.id === undefined),
      error: responseData.id === undefined ? 'error' : undefined,
    };
  };

  const login = (data: SignUpDataType): AuthMethodsReturnType => {
    return { isSuccess: false, error: 'user not found' };
  };
  return { login, register };
};

export default useAuth;
