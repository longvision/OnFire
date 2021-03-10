import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import RecipeDetailTemplate from '../templates/RecipeDetailTemplate';
import {MeasureList} from '../organisms/MeasureList';
import {RecipeSummary} from '../organisms/RecipeSummary';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const measures = new Array(20).fill({
  title: 'Cominho',
  description: '10g',
  cost: '0.2450 BRL',
});
const totalCost = 'R$53.43';

export const RecipeDetail = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  function handlePressRecipesDetails() {
    navigation.navigate('RecipeDetail');
  }
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="My Recipes"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <RecipeDetailTemplate
        title="Measures"
        list={
          <MeasureList
            data={measures}
            cta="Change"
            height="58%"
            width="90%"
            handlePress={handlePressRecipesDetails}
          />
        }
        summary={
          <RecipeSummary
            totalCost={totalCost}
            ingredientsCount={20}
            servings={8}
            cuisine="Mediterranean"
          />
        }
      />
    </SafeAreaView>
  );
};
