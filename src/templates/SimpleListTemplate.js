import React from 'react';

import {Button, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import {useNavigation} from '@react-navigation/native';

const SimpleListTemplate = ({list, button}) => {
  return (
    <Layout
      style={{
        alignItems: 'center',
        display: 'flex',
      }}>
      {list}
      <Layout
        style={{
          marginVertical: 2,
          width: '98%',
        }}>
        {button}
      </Layout>
    </Layout>
  );
};

export default SimpleListTemplate;
