import React from 'react';

import { Layout } from '@ui-kitten/components';

import AddIngredientForm from '../organisms/AddIngredientForm';

const AddIngredientTemplate = ({ selectedId }) => (
  <Layout style={{ height: '100%' }}>
    <AddIngredientForm selectedId={selectedId} />
  </Layout>
);

export default AddIngredientTemplate;
