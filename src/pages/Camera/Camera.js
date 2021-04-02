import {useRoute} from '@react-navigation/native';
import React from 'react';
import {CameraClass} from './CameraClass';

// import { Container } from './styles';

export const Camera = props => {
  const route = useRoute();

  return <CameraClass {...props} route={route} />;
};
