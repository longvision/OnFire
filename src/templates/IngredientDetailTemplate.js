import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import EditIngredientForm from '../organisms/EditIngredientForm';
import {useSelector, useDispatch} from 'react-redux';

// import { Container } from './styles';

const IngredientDetailTemplate = ({selectedId}) => {
  return (
    <Layout style={{height: '100%'}}>
      <EditIngredientForm selectedId={selectedId} />
    </Layout>
  );
};

export default IngredientDetailTemplate;
