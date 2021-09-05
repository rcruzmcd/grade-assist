/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import * as jwt_decode from 'jwt-decode';

interface IJwt {
  userId: string;
  userType: string;
  email: string;
  exp: string;
}

type AuthContextObj = {
  isAuthorized: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
  user: {
    token: string;
    userId: string;
    userType: string;
    email: string;
  };
};

export const AuthContext = React.createContext<AuthContextObj>({
  isAuthorized: false,
  user: { token: '', userId: '', userType: '', email: '' },
  onLogin: (token: string) => {},
  onLogout: () => {},
});

const AuthContextProvider: React.FC = (props: any) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({
    token: '',
    userId: '',
    userType: '',
    email: '',
  });

  const loginHandler = (token: string) => {
    console.log(token);
    setIsAuthorized(!!token);
    setUser({
      ...user,
      token: token,
      userId: jwt_decode.default<IJwt>(token).userId,
      userType: jwt_decode.default<IJwt>(token).userType,
      email: jwt_decode.default<IJwt>(token).email,
    });
  };

  const logoutHandler = () => {
    setIsAuthorized(false);
    setUser({ token: '', userId: '', userType: '', email: '' });
  };

  const contextValue: AuthContextObj = {
    isAuthorized: isAuthorized,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    user: user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
