import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import RecipeDetailTemplate from '../../templates/RecipeDetailTemplate';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useEffect} from 'react';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const measures = new Array(20).fill({
  title: 'Cominho',
  description: '10g',
  cost: '0.2450 BRL',
});
const totalCost = 'R$53.43';

export const RecipeDetail = ({navigation}) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const measures = useSelector((state) => state.measures.measures);
  const loadingDelete = useSelector(
    (state) => state.loading.effects.measures.deleteAsync,
  );
  const loadingCreate = useSelector(
    (state) => state.loading.effects.measures.addAsync,
  );
  const dispatch = useDispatch();
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // alert('Screen was focused');
  //     // Do something when the screen is focused
  //     dispatch.measures.listAsync();

  //     return () => {
  //       // alert('Screen was unfocused');
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [loading]),
  // );

  useEffect(() => {
    dispatch.measures.listAsync();
  }, [loadingDelete, loadingCreate]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="My Recipes"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <RecipeDetailTemplate
        measures={measures}
        navigation={navigation}
        ingredients={ingredients}
      />
    </SafeAreaView>
  );
};
