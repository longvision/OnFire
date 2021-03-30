import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import RecipeDetailTemplate from '../../templates/RecipeDetailTemplate';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const RecipeDetail = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const measures = useSelector(state => state.measures.measures);
  const selectedRecipeId = useSelector(state => state.recipes.selected.id);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const loadingDelete = useSelector(
    state => state.loading.effects.measures.deleteAsync,
  );
  const loadingCreate = useSelector(
    state => state.loading.effects.measures.addAsync,
  );

  //Faz o update do valor total e contagem dos items da receita
  const updateTotals = React.useCallback(async () => {
    try {
      const sum = await measures
        .map(item => item.cost)
        .reduce((a, b) => {
          return (a * 10000 + b * 10000) / 10000;
        }, 0);
      const count = await measures.length;
      setTotalCost(sum);
      setTotalCount(count);
    } catch (error) {}
  }, [measures]);

  //Recalcula a formula acima toda vez que há uma mudanca na lista de ingredientes do prato.
  React.useEffect(() => {
    updateTotals();
  }, [measures]);

  //Atualiza a lista toda vez que se cria ou se deleta um item novo.
  React.useEffect(() => {
    //   dispatch.measures.getAsync({id: selectedRecipeId});
  }, [loadingCreate, loadingDelete]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={t('Recipes')}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <RecipeDetailTemplate
        totalCount={totalCount}
        totalCost={totalCost}
        navigation={navigation}
        ingredients={ingredients}
        selectedRecipeId={selectedRecipeId}
      />
    </SafeAreaView>
  );
};
