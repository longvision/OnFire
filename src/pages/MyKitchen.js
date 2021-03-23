import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Layout,
  TopNavigation,
  Tab,
  TabView,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import IngredientListTemplate from '../templates/IngredientListTemplate';
import RecipeListTemplate from '../templates/RecipeListTemplate';

import {RecipeList} from '../organisms/RecipeList';
import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';
import {useFocusEffect} from '@react-navigation/native';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const AddIcon = (props) => <Icon {...props} name="plus-outline" />;
const EditIcon = (props) => <Icon {...props} name="edit-2-outline" />;

export const MyKitchen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const recipes = useSelector((state) => state.recipes.recipes);

  const loadingUpdate = useSelector(
    (state) => state.loading.effects.ingredients.updateAsync,
  );
  const loadingCreate = useSelector(
    (state) => state.loading.effects.recipes.addAsync,
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const EditIcon = (props) => {
    return <ThemedAwesomeIcon name="edit-2-outline" {...props} />;
  };
  const onSelect = (index) => setSelectedIndex(index);

  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      // Do something when the screen is focused
      dispatch.ingredients.listAsync();
      dispatch.recipes.listAsync();
      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [loadingUpdate, loadingCreate]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title={t('Kitchen')} alignment="center" />
      <Divider />
      <Layout style={{flex: 1}}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          tabsArray={[t('Recipes'), t('Ingredients')]}>
          <Tab title={t('RECIPES')} style={{height: 44}}>
            <RecipeListTemplate
              addIcon={AddIcon}
              iconName={EditIcon}
              navigation={navigation}
              recipes={recipes}
            />
          </Tab>
          <Tab title={t('INGREDIENTS')} style={{height: 44}}>
            <IngredientListTemplate
              ingredients={ingredients}
              navigation={navigation}
              addIcon={AddIcon}
            />
          </Tab>
        </TabView>
      </Layout>
    </SafeAreaView>
  );
};
