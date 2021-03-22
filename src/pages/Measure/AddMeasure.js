import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import AddMeasureTemplate from '../../templates/AddMeasureTemplate';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
// import { Container } from './styles';
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const AddMeasure = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const ingredients = useSelector((state) => state.ingredients.ingredients);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const loadingIngredient = useSelector(
    (state) => state.loading.effects.ingredients.addAsync,
  );

  React.useEffect(() => {
    dispatch.ingredients.listAsync();
  }, [loadingIngredient]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={t('Measures')}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AddMeasureTemplate />
      </Layout>
    </SafeAreaView>
  );
};
