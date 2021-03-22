import {
  Button,
  Icon,
  Input,
  Text,
  Layout,
  StyleService,
  Card,
} from '@ui-kitten/components';
import React, {useRef, useState, useImperativeHandle, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PriceInput from '../molecules/PriceInput';
import AutoCompleteField from '../molecules/AutocompleteField';
import {Field, Formik} from 'formik';

import SizeInput from '../molecules/SizeInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationHelpersContext,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import * as Yup from 'yup';
import SelectorAction from '../molecules/SelectorAction';
import AutocompleteField from '../molecules/AutocompleteField';
import {current} from 'immer';

const unitsArray = ['mL', 'g', 'L', 'KG'];
const saveIcon = (props) => <Icon {...props} name="save-outline" />;

const AddMeasureSchema = Yup.object().shape({
  ingredient: Yup.string().required('Ingredient name is qequired'),
  unit: Yup.string().required('Unit is required'),
  quantity: Yup.string().required('Quantity is required'),
});

const AddIcon = (props) => <Icon {...props} name="plus-outline" />;
const AddMeasureForm = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const productId = useSelector((state) => state.recipes.selected.id);
  const navigation = useNavigation();
  const unitAvailableRef = useRef();

  const quantityRef = useRef(null);
  const submitRef = useRef();
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedIngredientIndex, setSelectedIngredientIndex] = React.useState(
    0,
  );
  const [selectedUnitIndex, setSelectedUnitIndex] = React.useState(0);

  const [optionsArray, setOptionsArray] = React.useState([]);

  const [selectedId, setSelectedId] = React.useState();

  const loadingAddList = useSelector(
    (state) => state.loading.effects.ingredients.addAsync,
  );

  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      // Do something when the screen is focused
      dispatch.measures.getAsync({id: productId});
      // quantityRef.current.focus();
      return () => {
        // alert('Screen was unfocused');
        dispatch.measures.getAsync({id: productId});
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
        dispatch.measures.addAsync({
          values: values,
          productId: productId,
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
        <Layout style={styles.container} level="3">
          <Layout style={styles.controlContainer} level="3">
            <Text
              category="h4"
              appearance="alternative"
              status="basic"
              style={styles.title}>
              Select the ingredient
            </Text>

            <Layout style={styles.rowContainer} level="3">
              <SelectorAction
                status={errors.ingredient && touched.ingredient && 'danger'}
                placeholder="Ingredient"
                style={styles.ingredients}
                value={values.ingredient}
                actionTitle="Add new ingredient"
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
                onSelect={(index) => {
                  setSelectedIngredientIndex(index);
                }}
              />
              <Text category="c2" appearance="hint" status="danger">
                {errors.ingredient && touched.ingredient && errors.ingredient}
              </Text>
            </Layout>
            <Layout style={styles.rowContainer} level="3">
              <Text
                category="h4"
                appearance="alternative"
                status="basic"
                style={styles.title}>
                {`Select the measure unit`}
              </Text>
              <Selector
                status={errors.unit && touched.unit && 'danger'}
                placeholder="Unit"
                style={styles.input}
                value={values.unit}
                name="unit"
                data={unitsArray}
                selectedIndex={selectedUnitIndex}
                onSelect={(index) => {
                  setSelectedUnitIndex(index);
                  setFieldValue('unit', unitsArray[index.row]);
                  quantityRef.current.focus();
                }}
                ref={unitAvailableRef}
              />
              <Text category="c2" appearance="hint" status="danger">
                {errors.unit && touched.unit && errors.unit}
              </Text>
            </Layout>
            <Layout style={styles.packageContainer} level="3">
              <Layout style={styles.rowContainer} level="3">
                <Text
                  category="h4"
                  appearance="alternative"
                  status="basic"
                  style={styles.title}>
                  Type the quantity
                </Text>
                <SizeInput
                  status={errors.quantity && touched.quantity && 'danger'}
                  placeholder="Quantity to be added"
                  value={values.quantity}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  name="quantity"
                  mantissa={4}
                  styles={styles.input}
                  onSubmitEditing={() => {
                    submitRef.current.focus();
                  }}
                  ref={quantityRef}
                />
                <Text category="c2" appearance="hint" status="danger">
                  {errors.quantity && touched.quantity && errors.quantity}
                </Text>
              </Layout>
            </Layout>
            <Layout style={styles.submit} level="3">
              <Button onPress={handleSubmit}>ADD TO RECIPE</Button>
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
  container: {height: '100%', marginTop: 10},
  rowContainer: {
    marginVertical: 3,

    justifyContent: 'center',
    alignItems: 'center',
  },

  submit: {
    marginTop: 20,
  },
  controlContainer: {
    borderRadius: 4,
    // margin: 2,
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
