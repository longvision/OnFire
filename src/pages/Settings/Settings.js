import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import RecipeDetailTemplate from '../../templates/RecipeDetailTemplate';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const Settings = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={t('Settings')}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Button
        status="control"
        onPress={() => {
          dispatch.auth.signOutAsync();
        }}>
        {t('Logout')}
      </Button>
    </SafeAreaView>
  );
};
