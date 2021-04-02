import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RecipeDetailTemplate from '../../templates/RecipeDetailTemplate';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const RecipeDetail = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const measures = useSelector((state) => state.measures.measures);
  const selectedRecipeId = useSelector((state) => state.recipes.selected.id);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const loadingDelete = useSelector(
    (state) => state.loading.effects.measures.deleteAsync,
  );
  const loadingCreate = useSelector(
    (state) => state.loading.effects.measures.addAsync,
  );

  // Faz o update do valor total e contagem dos items da receita
  const updateTotals = React.useCallback(async () => {
    const sum = await measures
      .map((item) => item.cost)
      .reduce((a, b) => (a * 10000 + b * 10000) / 10000, 0);
    const count = await measures.length;
    setTotalCost(sum);
    setTotalCount(count);
  }, [measures]);

  // Recalcula a formula acima toda vez que há uma mudanca na lista de ingredientes do prato.
  React.useEffect(() => {
    updateTotals();
  }, [measures]);

  // Atualiza a lista toda vez que se cria ou se deleta um item novo.
  React.useEffect(() => {
    dispatch.measures.getAsync({ id: selectedRecipeId });
  }, [loadingCreate, loadingDelete]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

export default RecipeDetail;
