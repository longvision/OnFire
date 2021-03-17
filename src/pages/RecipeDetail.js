import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import RecipeDetailTemplate from '../templates/RecipeDetailTemplate';

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
      <RecipeDetailTemplate totalCost={totalCost} measures={measures} />
    </SafeAreaView>
  );
};
