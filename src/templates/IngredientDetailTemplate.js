import React from 'react';
import { Layout } from '@ui-kitten/components';
import EditIngredientForm from '../organisms/EditIngredientForm';

// import { Container } from './styles';

const IngredientDetailTemplate = ({ selectedItem }) => (
    <Layout style={{ height: '100%' }}>
      <EditIngredientForm selectedItem={selectedItem} />
    </Layout>
);

export default IngredientDetailTemplate;
