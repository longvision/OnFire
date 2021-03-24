import React, {useState, useEffect} from 'react';

import {Button, Icon, Layout} from '@ui-kitten/components';
import {RecipeList} from '../organisms/RecipeList';
import {useNavigation} from '@react-navigation/native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {IngredientList} from '../organisms/IngredientList';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const IngredientListTemplate = ({navigation, ingredients, addIcon}) => {
  const {t, i18n} = useTranslation();
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const handlePress = () => {
    navigation.navigate('AddIngredient');
  };

  return (
    <Layout style={{height: '100%'}}>
      <Layout
        style={{
          flex: 2,
        }}>
        <IngredientList
          data={ingredients}
          price
          cta={t('Details')}
          btnSize="small"
          containerStyle={{width: '100%'}}
          titles={[t('Ingredient'), t('Price per Package'), '']}
        />
      </Layout>
      <Layout
        style={{
          marginVertical: 2,
          alignItems: 'center',
          flex: 1,
        }}>
        <Button
          size="large"
          status="primary"
          accessoryLeft={addIcon}
          onPress={handlePress}
          appearance="filled">
          {t('Add_Ingredient')}
        </Button>
      </Layout>
    </Layout>
  );
};

export default IngredientListTemplate;
