import React, {useState} from 'react';

import {Button, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import {useNavigation} from '@react-navigation/native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';

const RecipeListTemplate = ({list, button}) => {
  const [visible, setVisible] = useState(false);
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
        <PopoverOverlay
          renderToggleButton={() => button}
          visible={visible}
          handleClose={() => setVisible(false)}
        />
      </Layout>
    </Layout>
  );
};

export default RecipeListTemplate;
