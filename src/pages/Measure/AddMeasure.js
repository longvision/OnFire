import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import AddMeasureTemplate from '../../templates/AddMeasureTemplate';

// import { Container } from './styles';
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const AddMeasure = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="My Measures"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AddMeasureTemplate ingredients={ingredients} />
      </Layout>
    </SafeAreaView>
  );
};
