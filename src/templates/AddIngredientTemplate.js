import React, {useState} from 'react';

import {Button, Icon, Text, Layout} from '@ui-kitten/components';
import {HighList} from '../organisms/HighList';
import {useNavigation} from '@react-navigation/native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import {IngredientList} from '../organisms/IngredientList';

import AddIngredientForm from '../organisms/AddIngredientForm';

const AddIngredientTemplate = ({
  ingredients,
  handlePressIngredientsDetails,
  addIcon,
}) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('AddIngredient');
  };

  return (
    <Layout style={{height: '100%'}}>
      <Layout
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}
        level="1">
        <Text category="h4" status="basic">
          Add a new Item to your Food Pantry
        </Text>
      </Layout>
      <AddIngredientForm />

      <Button
        size="large"
        status="primary"
        accessoryLeft={addIcon}
        onPress={handlePress}
        appearance="filled">
        Add
      </Button>
    </Layout>
  );
};

export default AddIngredientTemplate;
