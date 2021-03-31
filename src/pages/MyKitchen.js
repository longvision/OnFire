import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
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
  ButtonGroup,
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
import Loading from '../atoms/Loading';

// import { Container } from './styles';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const MyKitchen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [visible, setVisible] = useState(false);
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const recipes = useSelector(state => state.recipes.recipes);

  const EditIcon = props => {
    return <ThemedAwesomeIcon name="edit-2-outline" {...props} />;
  };
  const AddIcon = props => {
    return (
      <ThemedAwesomeIcon
        {...props}
        name="plus-thick"
        color={theme['color-basic-800']}
      />
    );
  };
  // const loadingUpdate = useSelector(
  //   state => state.loading.effects.ingredients.updateAsync,
  // );

  // const loadingUploadImage = useSelector(
  //   state => state.loading.effects.files.addAsync,
  // );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const handlePress = () => {
    navigation.navigate('AddIngredient');
  };

  function handleAddRecipe() {
    navigation.navigate('AddRecipe');
  }
  const fileModelUpdateLoading = useSelector(
    state => state.loading.effects.files.addAsync,
  );
  const fileModelDeleteLoading = useSelector(
    state => state.loading.effects.files.deleteAsync,
  );

  React.useEffect(() => {
    dispatch.recipes.listAsync();
  }, [fileModelDeleteLoading, fileModelUpdateLoading]);

  React.useEffect(() => {
    dispatch.ingredients.listAsync();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      dispatch.ingredients.listAsync();
      dispatch.recipes.listAsync();
      // Do something when the screen is focused

      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <TopNavigation title={t('Kitchen')} alignment="center" />
      <Divider />

      <Layout style={{flex: 1}}>
        <ButtonGroup
          style={{
            display: 'flex',
            width: '100%',
            borderColor: theme['color-basic-100'],
          }}
          appearance="outline"
          status={'basic'}>
          <Button
            style={{
              display: 'flex',
              width: '50%',
              backgroundColor:
                selectedIndex === 0 ? theme['color-basic-300'] : 'white',
            }}
            onPress={() => setSelectedIndex(0)}>
            <Text
              style={{
                color:
                  selectedIndex === 0
                    ? theme['color-basic-900']
                    : theme['color-basic-900'],
              }}>
              Recipes
            </Text>
          </Button>
          <Button
            style={{
              display: 'flex',
              width: '50%',
              backgroundColor:
                selectedIndex === 1 ? theme['color-basic-300'] : 'white',
            }}
            onPress={() => setSelectedIndex(1)}>
            <Text
              style={{
                color:
                  selectedIndex === 1
                    ? theme['color-basic-900']
                    : theme['color-basic-900'],
              }}>
              Ingredients
            </Text>
          </Button>
        </ButtonGroup>
        {(fileModelUpdateLoading || fileModelDeleteLoading) && (
          <Loading
            label="loading..."
            show={fileModelUpdateLoading || fileModelDeleteLoading}
            status="info"
            size="giant"
          />
        )}
        {selectedIndex === 0 ? (
          <RecipeListTemplate
            addIcon={AddIcon}
            recipes={recipes}
            iconName={EditIcon}
            navigation={navigation}
          />
        ) : (
          <IngredientListTemplate
            ingredients={ingredients}
            navigation={navigation}
            addIcon={AddIcon}
          />
        )}
      </Layout>
      {selectedIndex === 0 ? (
        <Button
          size="large"
          style={{borderRadius: 0}}
          status="primary"
          onPress={handleAddRecipe}
          accessoryLeft={AddIcon}
          appearance="filled">
          <Text style={{color: theme['color-basic-800']}}>
            {t('Create_Recipes')}
          </Text>
        </Button>
      ) : (
        <Button
          size="large"
          status="primary"
          style={{borderRadius: 0}}
          accessoryLeft={AddIcon}
          onPress={handlePress}
          appearance="filled">
          <Text style={{color: theme['color-basic-900']}}>
            {t('Add_Ingredient')}
          </Text>
        </Button>
      )}
    </SafeAreaView>
  );
};
