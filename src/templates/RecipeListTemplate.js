import React, {useState} from 'react';

import {Button, Card, Layout} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {RecipeList} from '../organisms/RecipeList';
import AddRecipeForm from '../organisms/AddRecipeForm';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../atoms/Loading';

const RecipeListTemplate = ({AddIcon, navigation, iconName}) => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const success = useSelector(state => state.files.success);
  const fileModelUpdateLoading = useSelector(
    state => state.loading.effects.files.addAsync,
  );
  const fileModelDeleteLoading = useSelector(
    state => state.loading.effects.files.deleteAsync,
  );

  React.useEffect(() => {
    dispatch.recipes.listAsync();
  }, [fileModelDeleteLoading]);

  React.useEffect(() => {
    dispatch.recipes.listAsync();
  }, [fileModelUpdateLoading]);

  return (
    <>
      {fileModelUpdateLoading && (
        <Loading
          label="loading.global"
          show={fileModelUpdateLoading}
          status="info"
          size="giant"
        />
      )}
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
