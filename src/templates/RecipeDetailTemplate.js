import React, {useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import {Card, Layout, Button, Icon, Modal, Text} from '@ui-kitten/components';
import {MeasureList} from '../organisms/MeasureList';

import {RecipeSummary} from '../organisms/RecipeSummary';
import AddMeasureForm from '../organisms/AddMeasureForm';
import {useFocusEffect} from '@react-navigation/core';

const RecipeDetailTemplate = ({measures, ingredients, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  function handlePressRecipesDetails() {
    navigation.navigate('RecipeDetail');
  }
  const handleCloseModal = () => {
    setVisible(false);
  };
  const handleAddMeasure = (values) => {
    // setVisible(true);
    navigation.navigate('AddMeasure');
  };

  const renderCloseIcon = (props) => <Icon {...props} name="close-outline" />;

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
        cta="Change"
        height="58%"
        width="90%"
        handlePress={handlePressRecipesDetails}
      />

      <Layout
        style={{
          marginVertical: 5,
          flexDirection: 'column',
          width: '100%',
        }}>
        <RecipeSummary
          totalCost={totalCost}
          ingredientsCount={totalCount}
          handleAddMeasure={handleAddMeasure}
          servings={8}
          cuisine="Mediterranean"
        />
      </Layout>
      <KeyboardAvoidingView>
        <Layout>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Layout style={styles.modal} level="3">
              <Button
                style={styles.button}
                onPress={handleCloseModal}
                accessoryLeft={renderCloseIcon}></Button>
            </Layout>
            <AddMeasureForm
              ingredients={ingredients}
              navigation={navigation}
              closeModal={handleCloseModal}
            />
          </Modal>
        </Layout>
      </KeyboardAvoidingView>
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
