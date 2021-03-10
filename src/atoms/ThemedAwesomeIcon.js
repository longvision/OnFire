import React from 'react';

import {withStyles, Icon} from '@ui-kitten/components';

const AwesomeIcon = (props) => {
  const {name} = props;

  return <Icon {...props} name={name} />;
};

export const ThemedAwesomeIcon = withStyles(AwesomeIcon);
