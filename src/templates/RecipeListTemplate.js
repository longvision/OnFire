import React, {useState} from 'react';

import {Button, Card, Layout, Modal} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {RecipeList} from '../organisms/RecipeList';

const RecipeListTemplate = ({AddIcon, navigation, InfoIcon, recipes}) => {
  const [visible, setVisible] = useState(false);

  const button = () => (
    <Button
      size="large"
      status="primary"
      onPress={handleAddMeasure}
      accessoryLeft={AddIcon}
      appearance="filled">
      Add Recipes
    </Button>
  );
  function handlePress() {
    navigation.navigate('RecipeDetail');
  }
  function handleAddMeasure() {
    setVisible(true);
  }
  return (
    <Layout style={{height: '100%'}}>
      <Layout
        style={{
          flex: 5,
        }}>
        <RecipeList
          recipes={recipes}
          rating
          titles={['Description', 'Popularity', 'Details']}
          cta
          btnSize="small"
          assessoryLeft={InfoIcon}
          containerStyle={{width: '98%'}}
          handlePressDetails={handlePress}
        />
      </Layout>
      <Layout
        style={{
          marginVertical: 2,
          alignItems: 'center',
          flex: 1,
        }}>
        <PopoverOverlay
          renderToggleButton={button}
          visible={visible}
          handleClose={() => setVisible(false)}
        />
      </Layout>
    </Layout>
  );
};

export default RecipeListTemplate;
