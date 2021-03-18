import React, {useState} from 'react';

import {Button, Card, Layout, Modal} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {RecipeList} from '../organisms/RecipeList';
import AddRecipeForm from '../organisms/AddRecipeForm';

const RecipeListTemplate = ({AddIcon, navigation, iconName, recipes}) => {
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
          rating={false}
          navigation={navigation}
          titles={['Description', 'Details']}
          cta
          btnSize="small"
          assessoryLeft={iconName}
          containerStyle={{width: '98%'}}
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
          handleClose={() => setVisible(false)}>
          <AddRecipeForm handleClose={() => setVisible(false)} />
        </PopoverOverlay>
      </Layout>
    </Layout>
  );
};

export default RecipeListTemplate;
