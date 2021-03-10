import React from 'react';

import {Button, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import {useNavigation} from '@react-navigation/native';

const SimpleListTemplate = ({list, button}) => {
  return (
    <Layout style={{height: '100%'}}>
      <Layout
        style={{
          flex: 5,
        }}>
        {list}
      </Layout>
      <Layout
        style={{
          marginVertical: 2,

          alignItems: 'center',
          flex: 1,
        }}>
        {button}
      </Layout>
    </Layout>
  );
};

export default SimpleListTemplate;
