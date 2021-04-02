import { Button, Icon, Text, Layout } from '@ui-kitten/components';
import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import SizeInput from '../molecules/SizeInput';
import SelectorAction from '../molecules/SelectorAction';

const unitsArray = ['mL', 'g', 'L', 'KG'];
const saveIcon = (props) => <Icon {...props} name="save-outline" />;

const AddIcon = (props) => <Icon {...props} name="plus-outline" />;
const AddMeasureForm = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const productId = useSelector((state) => state.recipes.selected.id);
  const navigation = useNavigation();
  const unitAvailableRef = useRef();

  const quantityRef = useRef(null);
  const submitRef = useRef();
  const listRef = useRef(null);
  const [selectedIngredientIndex, setSelectedIngredientIndex] = React.useState(
    0,
  );
  const [selectedUnitIndex, setSelectedUnitIndex] = React.useState(0);
  const [formattedQuantity, setFormattedQuantity] = React.useState('');

  const [selectedUnit, setSelectedUnit] = React.useState('');
  const [optionsArray, setOptionsArray] = React.useState([]);

  const [selectedId, setSelectedId] = React.useState();

  const loadingAddList = useSelector(
    (state) => state.loading.effects.ingredients.addAsync,
  );
  const AddMeasureSchema = Yup.object().shape({
    ingredient: Yup.string().required(t('Ingredient_name_is_required')),
    unit: Yup.string().required(t('Unit_is_required')),
    quantity: Yup.string().required(t('Quantity_is_required')),
  });
  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      // Do something when the screen is focused
      dispatch.measures.getAsync({ id: productId });
      // quantityRef.current.focus();
      return () => {
        // alert('Screen was unfocused');
        // dispatch.measures.getAsync({id: productId});
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [loadingAddList]),
  );

  useEffect(() => {
    const listItems = ingredients.map((item) => item.name);
    setOptionsArray(listItems);
  }, [ingredients]);

  return (
    <Formik
      initialValues={{
        ingredient: '',
        unit: '',
        quantity: '',
      }}
      validationSchema={AddMeasureSchema}
      onSubmit={(values) => {
        values.quantity = formattedQuantity;
        dispatch.measures.addAsync({
          values,
          productId,
          ingredientId: selectedId,
        });

        navigation.goBack();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        errors,
        touched,
        values,
      }) => (
        <Layout style={{ height: '100%' }}>
          <Layout style={styles.container} level="1">
            <Layout style={styles.controlContainer} level="1">
              <Text
                category="h4"
                appearance="alternative"
                status="basic"
                style={styles.title}>
                {t('Select_the_ingredient')}
              </Text>

              <Layout style={styles.rowContainer} level="1">
                <SelectorAction
                  status={errors.ingredient && touched.ingredient && 'danger'}
                  placeholder={t('Ingredient')}
                  style={styles.ingredients}
                  value={values.ingredient}
                  actionTitle={t('Add_new_ingredient')}
                  icon={AddIcon}
                  ref={listRef}
                  navigateTo="AddIngredient"
                  name="ingredient"
                  onBlur={() => listRef.current.blur()}
                  data={optionsArray}
                  selectedIndex={selectedIngredientIndex}
                  handlePressItem={(item) => {
                    const indexOfItem = ingredients.filter(
                      (i) => i.name === item,
                    );
                    setSelectedId(indexOfItem[0].id);
                    setFieldValue('ingredient', item);
                  }}
                  onSelect={(index) => setSelectedIngredientIndex(index)}
                />
                <Text category="c2" appearance="hint" status="danger">
                  {errors.ingredient && touched.ingredient && errors.ingredient}
                </Text>
              </Layout>
              <Layout style={styles.rowContainer} level="1">
                <Text
                  category="h4"
                  appearance="alternative"
                  status="basic"
                  style={styles.title}>
                  {t('Select_the_unit_of_measurement')}
                </Text>
                <Selector
                  status={errors.unit && touched.unit && 'danger'}
                  placeholder={t('Unit')}
                  style={styles.input}
                  value={values.unit}
                  name="unit"
                  data={unitsArray}
                  selectedIndex={selectedUnitIndex}
                  onSelect={(index) => {
                    setSelectedUnitIndex(index);
                    setFieldValue('unit', unitsArray[index.row]);
                    setFieldValue('quantity', '');
                    setFormattedQuantity('');
                    setSelectedUnit(unitsArray[index.row]);

                    // quantityRef.current.focus();
                  }}
                  ref={unitAvailableRef}
                />
                <Text category="c2" appearance="hint" status="danger">
                  {errors.unit && touched.unit && errors.unit}
                </Text>
              </Layout>
              <Layout style={styles.packageContainer} level="1">
                <Layout style={styles.rowContainer} level="1">
                  <Text
                    category="h4"
                    appearance="alternative"
                    status="basic"
                    style={styles.title}>
                    {t('Enter_the_ingredient_amount')}
                  </Text>
                  <SizeInput
                    status={errors.quantity && touched.quantity && 'danger'}
                    placeholder={t('Quantity_to_be_added')}
                    value={values.quantity}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    setFormattedSize={setFormattedQuantity}
                    unit={selectedUnit || ''}
                    name="quantity"
                    mantissa={4}
                    styles={styles.input}
                    onSubmitEditing={() => submitRef.current.focus()}
                    ref={quantityRef}
                  />
                  <Text category="c2" appearance="hint" status="danger">
                    {errors.quantity && touched.quantity && errors.quantity}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
            <Layout style={styles.submit} level="1">
              <Button type="button" onPress={handleSubmit}>
                <Text category="s2" status="basic">
                  {t('ADD_TO_RECIPE')}
                </Text>
              </Button>
            </Layout>
          </Layout>
        </Layout>
      )}
    </Formik>
  );
};
// {
// 	"name": "Coca-Cola",
// 	"brand": "Coca-Cola",
// 	"seller": "Pao de Acucar",
// 	"sold_region": "Campo Belo",
// 	"package_price": 6.5,
// 	"unit": "mL",
// 	"package_size": 3000
// }

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
  title: {
    marginBottom: 20,
  },
  ingredients: {
    width: '90%',
  },
  button: {
    // flex: 1,
    // width: '100%',
    marginTop: 10,
    // margin: 2,
  },
  container: {
    height: '100%',
    marginTop: 20,
    paddingBottom: 35,
    marginBottom: 35,
  },
  rowContainer: {
    marginVertical: 3,

    justifyContent: 'center',
    alignItems: 'center',
  },

  submit: {
    marginTop: 20,
  },
  controlContainer: {
    // margin: 2,
    flex: 1,
    width: '100%',
    height: '100%',
    // padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageContainer: {
    borderRadius: 5,
    // margin: 2,
    width: '100%',
    height: '40%',
    // padding: 6,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddMeasureForm;
