import React from 'react';
import { View } from 'react-native';
import { withStyles } from '@ui-kitten/components';

const AwesomeView = (props) => {
  const { eva, style, ...restProps } = props;

  return <View {...restProps} style={[eva.style.awesome, style]} />;
};

export const ThemedAwesomeView = withStyles(AwesomeView, (theme) => ({
  awesome: {
    backgroundColor: theme['color-primary-500'],
  },
}));
