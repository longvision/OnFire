import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  Tab,
  TabView,
  TopNavigationAction,
  ViewPager,
} from '@ui-kitten/components';

import SimpleListTemplate from '../templates/SimpleListTemplate';

import SimpleTabBar from '../atoms/SimpleTabBar';
import {HighList} from '../organisms/HighList';
import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const MyKitchen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const onSelect = (index) => setSelectedIndex(index);

  const data = new Array(20).fill({
    title: 'Title for Item',
    description: 'Description for Item',
  });
  const data2 = new Array(20).fill({
    title: 'Cominho',
    description: 'Especiarias do oriente',
  });

  function handlePressIngredientsDetails() {
    navigation.navigate('IngredientDetail');
  }
  function handlePressRecipesDetails() {
    navigation.navigate('RecipeDetail');
  }
  const InfoIcon = (props) => {
    return <ThemedAwesomeIcon name="maximize-outline" {...props} />;
  };
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Layout>
        <TopNavigation
          title={selectedIndex === 0 ? 'My Recipes' : 'My Ingredients Shelf'}
          alignment="center"
          accessoryLeft={BackAction}
        />
        <Divider />
        <TabView
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          tabsArray={['Recipes', 'Shelf']}>
          <Tab title="RECIPES">
            <SimpleListTemplate
              button={
                <Button size="large" status="info" appearance="filled">
                  Add Recipe
                </Button>
              }
              list={
                <HighList
                  data={data}
                  rating
                  titles={['Description', 'Popularity', 'Details']}
                  cta
                  btnSize="small"
                  assessoryLeft={InfoIcon}
                  height="75%"
                  width="98%"
                  handlePress={handlePressRecipesDetails}
                />
              }
            />
          </Tab>
          <Tab title="INGREDIENTS">
            <SimpleListTemplate
              button={
                <Button size="large" status="info" appearance="filled">
                  Add Ingredients
                </Button>
              }
              list={
                <HighList
                  data={data2}
                  cta="Details"
                  btnSize="small"
                  height="75%"
                  titles={['Ingredient', 'Detail']}
                  width="98%"
                  handlePress={handlePressIngredientsDetails}
                />
              }
            />
          </Tab>
        </TabView>
      </Layout>
    </SafeAreaView>
  );
};
