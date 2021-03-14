import React, {useState} from 'react';

import {Button, Icon, Text, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import {useNavigation} from '@react-navigation/native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {IngredientList} from '../organisms/IngredientList';

import AddIngredientForm from '../organisms/AddIngredientForm';

const AddIngredientTemplate = ({
  ingredients,
  handlePressIngredientsDetails,
  addIcon,
}) => {
  return (
    <Layout style={{height: '100%'}}>
      <AddIngredientForm />
    </Layout>
  );
};

export default AddIngredientTemplate;
