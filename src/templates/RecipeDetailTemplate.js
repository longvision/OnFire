import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Card, Layout, Button, Icon, Modal, Text} from '@ui-kitten/components';
import {MeasureList} from '../organisms/MeasureList';

import {RecipeSummary} from '../organisms/RecipeSummary';
import AddMeasureForm from '../organisms/AddMeasureForm';
import {useFocusEffect} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const RecipeDetailTemplate = ({
  measures,
  ingredients,
  selectedRecipeId,
  navigation,
  totalCost,
  totalCount,
}) => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const handleAddMeasure = () => {
    navigation.navigate('AddMeasure');
  };
  const handleDeleteMeasure = () => {
    Alert.alert(
      'Delete this recipe?',
      'Are you sure  you want to delete this recipes and all its measures?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch.recipes.deleteAsync({id: selectedRecipeId});
            navigation.navigate('MyKitchen');
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  return (
    <Layout
      level="1"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
      }}>
      <MeasureList img={true} cta={t('DELETE')} height="78%" width="92%" />

      <Layout
        style={{
          marginVertical: 5,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          flex: 1,
        }}>
        <RecipeSummary
          totalCost={totalCost.toFixed(2)}
          ingredientsCount={totalCount}
          handleAddMeasure={handleAddMeasure}
          handleDeleteMeasure={handleDeleteMeasure}
        />
      </Layout>
    </Layout>
  );
};

export default RecipeDetailTemplate;

const styles = StyleSheet.create({
  container: {
    minHeight: 692,
  },

  icon: {color: 'white'},
  button: {
    margin: 2,
    width: 54,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.74)',
  },
  modal: {
    height: 54,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignItems: 'flex-end',
    marginRight: 7,
  },
});
