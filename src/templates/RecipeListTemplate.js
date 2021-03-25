import React, {useState} from 'react';

import {Button, Card, Layout, Modal} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {RecipeList} from '../organisms/RecipeList';
import AddRecipeForm from '../organisms/AddRecipeForm';
import {useTranslation} from 'react-i18next';

const RecipeListTemplate = ({AddIcon, navigation, iconName, recipes}) => {
  const {t, i18n} = useTranslation();

  return (
    <>
      <Layout style={{height: '100%'}}>
        <Layout
          style={{
            flex: 2,
          }}>
          <RecipeList
            recipes={recipes}
            rating={false}
            navigation={navigation}
            titles={[t('Description'), t('Details')]}
            cta
            btnSize="medium"
            assessoryLeft={iconName}
            containerStyle={{width: '98%'}}
          />
        </Layout>
      </Layout>
    </>
  );
};

export default RecipeListTemplate;
