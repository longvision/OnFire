import React, {useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import {Card, Layout, Button, Icon, Modal, Text} from '@ui-kitten/components';
import {MeasureList} from '../organisms/MeasureList';

import {RecipeSummary} from '../organisms/RecipeSummary';
import AddMeasureForm from '../organisms/AddMeasureForm';
import {useFocusEffect} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';

const RecipeDetailTemplate = ({measures, ingredients, navigation}) => {
  const [totalCost, setTotalCost] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  const handleAddMeasure = (values) => {
    navigation.navigate('AddMeasure');
  };

  React.useEffect(() =>
    // alert('Screen was focused');
    // Do something when the screen is focused
    {
      const sum = measures
        .map((item) => item.cost)
        .reduce((a, b) => {
          return (a * 10000 + b * 10000) / 10000;
        }, 0);
      const count = measures.length;
      setTotalCost(sum);
      setTotalCount(count);
    }, [measures]);

  return (
    <Layout
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        height: '98%',
      }}>
      <Text>Measures</Text>
      <MeasureList
        data={measures}
        img={true}
        cta="DELETE"
        height="58%"
        width="90%"
      />

      <Layout
        style={{
          marginVertical: 5,
          flexDirection: 'column',
          width: '100%',
        }}>
        <RecipeSummary
          totalCost={totalCost.toFixed(2)}
          ingredientsCount={totalCount}
          handleAddMeasure={handleAddMeasure}
          servings={8}
          cuisine="Mediterranean"
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
