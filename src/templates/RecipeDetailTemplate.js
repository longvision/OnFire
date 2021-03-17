import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Layout, Button, Icon, Modal, Text} from '@ui-kitten/components';
import {MeasureList} from '../organisms/MeasureList';

import {RecipeSummary} from '../organisms/RecipeSummary';
import AddMeasureForm from '../organisms/AddMeasureForm';

const RecipeDetailTemplate = ({
  measures,
  ingredients,
  navigation,
  totalCost,
}) => {
  const [visible, setVisible] = useState(false);

  function handlePressRecipesDetails() {
    navigation.navigate('RecipeDetail');
  }
  const handleCloseModal = () => {
    setVisible(false);
  };
  const handleAddMeasure = (values) => {
    setVisible(true);
  };

  React.useEffect(() => {}, [visible]);

  const renderCloseIcon = (props) => <Icon {...props} name="close-outline" />;

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
          ingredientsCount={20}
          handleAddMeasure={handleAddMeasure}
          servings={8}
          cuisine="Mediterranean"
        />
      </Layout>
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
