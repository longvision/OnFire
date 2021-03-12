import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Layout,
  TopNavigation,
  Tab,
  TabView,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import IngredientListTemplate from '../templates/IngredientListTemplate';
import RecipeListTemplate from '../templates/RecipeListTemplate';

import {HighList} from '../organisms/HighList';
import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const AddIcon = (props) => <Icon {...props} name="plus-outline" />;
export const MyKitchen = ({navigation}) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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

  useEffect(() => {
    dispatch.ingredients.listAsync();
  }, []);

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
      <Divider />
      <Layout style={{flex: 10}}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          tabsArray={['Recipes', 'Shelf']}>
          <Tab title="RECIPES">
            <RecipeListTemplate
              button={
                <Button
                  size="large"
                  status="primary"
                  accessoryLeft={AddIcon}
                  appearance="filled">
                  Add Recipes
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
                  containerStyle={{width: '98%'}}
                  handlePress={handlePressRecipesDetails}
                />
              }
            />
          </Tab>
          <Tab title="INGREDIENTS">
            <IngredientListTemplate
              ingredients={ingredients}
              addIcon={AddIcon}
              handlePressIngredientsDetails={handlePressIngredientsDetails}
            />
          </Tab>
        </TabView>
      </Layout>
    </SafeAreaView>
  );
};
