import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';
export const ThemedAwesomeIcon = props => (
  <MaterialCommunityIcons color={props.color} size={24} name={props.name} />
);
