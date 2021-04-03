import React from 'react';

import { Layout } from '@ui-kitten/components';
import EditIngredientForm from '../organisms/EditIngredientForm';

const EditIngredientTemplate = ({ selectedItem }) => (
  <Layout style={{ height: '100%' }}>
    <EditIngredientForm selectedItem={selectedItem} />
  </Layout>
);

export default EditIngredientTemplate;
