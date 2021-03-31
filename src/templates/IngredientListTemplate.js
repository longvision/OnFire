import React from 'react';

import { Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { IngredientList } from '../organisms/IngredientList';

const IngredientListTemplate = ({ navigation, ingredients, addIcon }) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout style={{ height: '100%' }}>
      <Layout
        style={{
          flex: 2,
        }}>
        <IngredientList
          data={ingredients}
          price
          cta={t('Details')}
          btnSize="small"
          containerStyle={{ width: '100%', paddingBottom: 55 }}
          titles={[t('Ingredient'), t('Price per Package'), '']}
        />
      </Layout>
    </Layout>
  );
};

export default IngredientListTemplate;
