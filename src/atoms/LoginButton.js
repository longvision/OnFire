import React from 'react';
import { Button } from '@ui-kitten/components';
import { FacebookIcon } from './FacebookIcon';

export const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);
