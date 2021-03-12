import {Layout} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import AddIngredientTemplate from '../../templates/AddIngredientTemplate';
import {AutoCompleteField} from '../../molecules/AutocompleteField';

// import { Container } from './styles';

export const AddIngredient = () => {
  return (
    <Layout>
      <AddIngredientTemplate />
    </Layout>
  );
};
