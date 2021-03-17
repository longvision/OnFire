import React from 'react';

import {StyleSheet} from 'react-native';
import {Button, Card, Layout, Spinner, Text} from '@ui-kitten/components';

import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';

export const RecipeSummary = ({
  label,
  totalCost,
  cuisine,
  handleAddMeasure,
  width,
  servings,
  ingredientsCount,
  ...props
}) => {
  const AddIcon = (props) => {
    return <ThemedAwesomeIcon name="plus-outline" {...props} />;
  };

  return (
    <>
      <Text>{label && label}</Text>
      <Layout style={{width: width}}>
        <Layout style={styles.container}>
          <Card style={styles.cardPop} status="info">
            <Text style={styles.cardText} category="h5">{`Total Cost`}</Text>
            <Text style={styles.cardText} category="h2">
              {totalCost}
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
          <Card style={styles.cardDetails}>
            <Text style={styles.cardText} category="h4">{`${cuisine}`}</Text>
            <Text
              style={styles.cardText}
              category="h6">{`Serves ${servings} portions`}</Text>
          </Card>
          <Button
            status="info"
            accessoryLeft={AddIcon}
            onPress={handleAddMeasure}
            style={styles.button}>
            Ingredient
          </Button>
        </Layout>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  cardDetails: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '50%',
    paddingLeft: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    marginLeft: 2,
  },
});
