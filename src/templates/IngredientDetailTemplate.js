import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';

// import { Container } from './styles';
const data = new Array(8).fill({
  title: 'Cominho',
  description: 'Pimenta mista de cominho',
});

const RecipeDetailTemplate = () => {
  return (
    <>
      <HighList data={data} label="Recipe Ingredients" cta="Edit" />
      <Button size="giant">Add Ingredient</Button>
    </>
  );
};

export default RecipeDetailTemplate;
