import React, {useState} from 'react';

import {Button, Icon, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import {useNavigation} from '@react-navigation/native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {IngredientList} from '../organisms/IngredientList';
import {Text} from 'react-native-svg';

const IngredientListTemplate = ({ingredients, addIcon}) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('AddIngredient');
  };

  return (
    <Layout style={{height: '100%'}}>
      <Layout
        style={{
          flex: 5,
        }}>
        <IngredientList
          data={ingredients}
          price
          cta="Details"
          btnSize="small"
          containerStyle={{width: '100%'}}
          titles={['Ingredient', 'Price per Package', '']}
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
          Add Ingredients
        </Button>
      </Layout>
    </Layout>
  );
};

export default IngredientListTemplate;
