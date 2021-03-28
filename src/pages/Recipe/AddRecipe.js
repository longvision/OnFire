import React from 'react';

import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Alert, SafeAreaView, View} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import AddRecipeTemplate from '../../templates/AddRecipeTemplate';
// import { Container } from './styles';
const BackIcon = props => <Icon {...props} name="arrow-back" />;
export const AddRecipe = () => {
  const {t, i18n} = useTranslation();
  const failed = useSelector(state => state.measures.failed);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const ingredients = useSelector((state) => state.ingredients.ingredients);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={t('Recipes')}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <AddRecipeTemplate />
      </Layout>
    </SafeAreaView>
  );
};
