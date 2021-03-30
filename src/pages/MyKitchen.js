import React, {useState} from 'react';
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
  useTheme,
} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import IngredientListTemplate from '../templates/IngredientListTemplate';
import RecipeListTemplate from '../templates/RecipeListTemplate';

import {RecipeList} from '../organisms/RecipeList';
import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';
import {useFocusEffect} from '@react-navigation/native';
import {PopoverOverlay} from '../organisms/PopoverOverlay';
import AddRecipeForm from '../organisms/AddRecipeForm';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';

const BackIcon = props => <Icon {...props} name="arrow-back" />;
const AddIcon = props => <Icon {...props} name="plus-outline" />;
const EditIcon = props => <Icon {...props} name="edit-2-outline" />;

export const MyKitchen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [visible, setVisible] = useState(false);
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const recipes = useSelector(state => state.recipes.recipes);

  const RecipeIcon = props => (
    <MaterialCommunityIcons
      {...props}
      style={{color: theme['color-primary-300']}}
      size={24}
      name="pasta"
    />
  );
  const IngredientIcon = props => (
    <MaterialCommunityIcons
      {...props}
      style={{color: theme['color-primary-300']}}
      size={24}
      name="shaker-outline"
    />
  );

  const loadingUpdate = useSelector(
    state => state.loading.effects.ingredients.updateAsync,
  );

  const loadingCreate = useSelector(
    state => state.loading.effects.recipes.addAsync,
  );
  const loadingUploadImage = useSelector(
    state => state.loading.effects.files.addAsync,
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const EditIcon = props => {
    return <ThemedAwesomeIcon name="edit-2-outline" {...props} />;
  };
  const onSelect = index => setSelectedIndex(index);
  const handlePress = () => {
    navigation.navigate('AddIngredient');
  };

  function handleAddRecipe() {
    navigation.navigate('AddRecipe');
  }

  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      // Do something when the screen is focused

      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [loadingUpdate]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title={t('Kitchen')} alignment="center" />
      <Divider />

      <Layout style={{flex: 1}}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          tabsArray={[t('Recipes'), t('Ingredients')]}>
          <Tab
            title={t('RECIPES')}
            style={{
              backgroundColor:
                selectedIndex === 0 ? theme['color-basic-200'] : null,
              height: 44,
            }}
            icon={RecipeIcon}>
            <RecipeListTemplate
              addIcon={AddIcon}
              iconName={EditIcon}
              navigation={navigation}
              recipes={recipes}
            />
          </Tab>

          <Tab
            title={t('INGREDIENTS')}
            style={{
              backgroundColor:
                selectedIndex === 1 ? theme['color-basic-200'] : null,
              height: 44,
            }}
            icon={IngredientIcon}>
            <Layout
              style={{
                height: '100%',
              }}>
              <IngredientListTemplate
                ingredients={ingredients}
                navigation={navigation}
                addIcon={AddIcon}
              />
            </Layout>
          </Tab>
        </TabView>
      </Layout>
      {selectedIndex === 0 ? (
        <Button
          size="large"
          style={{borderRadius: 0}}
          status="primary"
          onPress={handleAddRecipe}
          accessoryLeft={AddIcon}
          appearance="filled">
          {t('Create_Recipes')}
        </Button>
      ) : (
        <Button
          size="large"
          status="primary"
          style={{borderRadius: 0}}
          accessoryLeft={AddIcon}
          onPress={handlePress}
          appearance="filled">
          {t('Add_Ingredient')}
        </Button>
      )}
    </SafeAreaView>
  );
};
