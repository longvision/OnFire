import React from 'react';

import { Layout } from '@ui-kitten/components';
import { RecipeList } from '../organisms/RecipeList';

const RecipeListTemplate = ({
  AddIcon, navigation, recipes, iconName,
}) => (
    <Layout style={{ height: '100%' }}>
      <RecipeList
        recipes={recipes}
        rating={false}
        navigation={navigation}
        handleCamera={(id) => {
          navigation.navigate('Camera', {
            product_id: id,
          });
        }}
        cta
        assessoryLeft={iconName}
      />
    </Layout>
);

export default RecipeListTemplate;
