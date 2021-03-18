import React from 'react';

import {StyleSheet} from 'react-native';
import {Button, Card, Layout, Spinner, Text} from '@ui-kitten/components';

import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';

export const RecipeSummary = ({
  label,
  totalCost,
  cuisine,
  handleAddMeasure,
  handleDeleteMeasure,
  width,
  servings,
  ingredientsCount,
  ...props
}) => {
  const AddIcon = (props) => {
    return <ThemedAwesomeIcon name="plus-outline" {...props} />;
  };
  const DeleteIcon = (props) => {
    return <ThemedAwesomeIcon name="trash-outline" {...props} />;
  };

  return (
    <>
      <Text>{label && label}</Text>
      <Layout style={styles.main}>
        <Layout style={styles.container}>
          <Card style={styles.cardPop} status="info">
            <Text style={styles.cardText} category="h5">{`Total Cost`}</Text>
            <Text style={styles.cardText} category="h2">
              $ {totalCost}
            </Text>
          </Card>
          <Card style={styles.cardPop}>
            <Text style={styles.cardText} category="h5">
              {`Ingredients`}
            </Text>
            <Text style={styles.cardText} category="h2">
              {`${ingredientsCount} items`}
            </Text>
          </Card>
        </Layout>
        <Layout style={styles.container}>
          <Layout style={styles.buttonPop}>
            <Button
              status="danger"
              accessoryLeft={DeleteIcon}
              onPress={handleDeleteMeasure}>
              Delete Recipe
            </Button>
          </Layout>
          <Layout style={styles.buttonPop} status="info">
            <Button
              status="info"
              accessoryLeft={AddIcon}
              onPress={handleAddMeasure}>
              Ingredient
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  main: {flexDirection: 'column'},
  text: {
    margin: 0,
  },
  cardText: {},
  card: {
    margin: 2,
  },
  cardPop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPop: {
    flex: 1,
  },
});
