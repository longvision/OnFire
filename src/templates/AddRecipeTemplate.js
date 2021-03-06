import React from 'react';

import { Layout } from '@ui-kitten/components';

import AddRecipeForm from '../organisms/AddRecipeForm';

const AddRecipeTemplate = () => (
    <Layout style={{ height: '100%', width: '80%' }}>
      <AddRecipeForm />
    </Layout>
);

export default AddRecipeTemplate;
