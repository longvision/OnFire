import React from 'react';
// import {Text} from 'react-native';
import {withStyles, Text} from '@ui-kitten/components';

const AwesomeText = (props) => {
  const {eva, style, ...restProps} = props;

  return <Text {...restProps}>{props.children}</Text>;
};

export const ThemedAwesomeText = withStyles(AwesomeText);
