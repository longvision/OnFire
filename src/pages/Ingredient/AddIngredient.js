import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import AddIngredientTemplate from '../../templates/AddIngredientTemplate';
import {AutoCompleteField} from '../../molecules/AutocompleteField';

// import { Container } from './styles';
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const AddIngredient = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="My Ingredients"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AddIngredientTemplate />
      </Layout>
    </SafeAreaView>
  );
};
