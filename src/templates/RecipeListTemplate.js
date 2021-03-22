import React, {useState} from 'react';

import {Button, Card, Layout, Modal} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {RecipeList} from '../organisms/RecipeList';
import AddRecipeForm from '../organisms/AddRecipeForm';
import {useTranslation} from 'react-i18next';

const RecipeListTemplate = ({AddIcon, navigation, iconName, recipes}) => {
  const [visible, setVisible] = useState(false);
  const {t, i18n} = useTranslation();

  const button = () => (
    <Button
      size="large"
      status="primary"
      onPress={handleAddMeasure}
      accessoryLeft={AddIcon}
      appearance="filled">
      {t('Create_Recipes')}
    </Button>
  );

  function handleAddMeasure() {
    setVisible(true);
  }
  return (
    <Layout style={{height: '100%'}}>
      <Layout
        style={{
          flex: 3,
        }}>
        <RecipeList
          recipes={recipes}
          rating={false}
          navigation={navigation}
          titles={[t('Description'), t('Details')]}
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
