import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import MainNavigator from './bottom.navigator';
import AuthNavigator from './auth.navigator';

export const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {}, [token]);

  return token ? <MainNavigator /> : <AuthNavigator />;
};
