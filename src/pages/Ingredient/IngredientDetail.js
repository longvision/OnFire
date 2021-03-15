import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import IngredientDetailTemplate from '../../templates/IngredientDetailTemplate';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const IngredientDetail = ({navigation}) => {
  const route = useRoute();
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="My Ingredients"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <IngredientDetailTemplate selectedItem={route.params.item} />
      </Layout>
    </SafeAreaView>
  );
};
