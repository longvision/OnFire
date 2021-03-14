import React from 'react';
import {View} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import EditIngredientForm from '../organisms/EditIngredientForm';

// import { Container } from './styles';
const selectedItem = {
  ingredient: 'cominho',
  brand: 'sal',
  seller: 'Pao de Acucar',
  region: 'RJ',
  size: 20.0,
  unit: 'g',
  price: '$20.00',
};
const IngredientDetailTemplate = () => {
  return (
    <Layout style={{height: '100%'}}>
      <EditIngredientForm selectedItem={selectedItem} />
    </Layout>
  );
};

export default IngredientDetailTemplate;
