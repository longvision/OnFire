import React from 'react';
import {ImageStyle, TouchableOpacity} from 'react-native';
import {Icon, IconElement} from '@ui-kitten/components';

export const EmailIcon = props => <Icon {...props} name="email" />;

export const EyeIcon = ({onPasswordIconPress, ...props}) => (
  <TouchableOpacity onPress={onPasswordIconPress}>
    <Icon {...props} name="eye" onPress={onPasswordIconPress} />
  </TouchableOpacity>
);

export const EyeOffIcon = ({onPasswordIconPress, ...props}) => (
  <TouchableOpacity onPress={onPasswordIconPress}>
    <Icon {...props} name="eye-off" />
  </TouchableOpacity>
);

export const PersonIcon = props => <Icon {...props} name="person" />;

export const PlusIcon = props => <Icon {...props} name="plus" />;
