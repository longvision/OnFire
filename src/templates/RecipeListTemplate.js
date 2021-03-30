import React, {useState} from 'react';

import {Button, Card, Layout} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {RecipeList} from '../organisms/RecipeList';
import AddRecipeForm from '../organisms/AddRecipeForm';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../atoms/Loading';

const RecipeListTemplate = ({AddIcon, navigation, recipes, iconName}) => {
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
            handleCamera={id => {
              navigation.navigate('Camera', {
                product_id: id,
              });
            }}
            cta
            assessoryLeft={iconName}
            containerStyle={{width: '100%'}}
          />
        </Layout>
      </Layout>
    </>
  );
};

export default RecipeListTemplate;
