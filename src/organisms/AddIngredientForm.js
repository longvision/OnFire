import {Button, Icon, Input, Layout, StyleService} from '@ui-kitten/components';
import React, {useRef, useImperativeHandle, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PriceInput from '../molecules/PriceInput';
import AutoCompleteField from '../molecules/AutocompleteField';
import {Field, Formik} from 'formik';
import Selector from '../molecules/Selector';
import SizeInput from '../molecules/SizeInput';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const data = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
];

const addIcon = (props) => <Icon {...props} name="plus-outline" />;

const AddIngredientForm = () => {
  const brandRef = useRef();
  const sellerRef = useRef();
  const soldRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();
  const sizeRef = useRef();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigation = useNavigation();
  const unitsArray = ['mL', 'g', 'L', 'KG'];

  return (
    <Formik
      initialValues={{
        ingredient: '',
        brand: '',
        seller: '',
        region: '',
        size: '',
        unit: '',
        price: '',
      }}
      onSubmit={(values) => {
        dispatch.ingredients.addAsync(values);
        navigation.navigate('MyKitchen');
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        values,
      }) => (
        <Layout style={styles.container}>
          <Layout style={styles.controlContainer}>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                array={data}
                name="ingredient"
                returnKeyType="next"
                value={values.ingredient}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onSubmitEditing={() => brandRef.current.focus()}
                placeholder="Ingredient Name"
                autoCompleteType="off"
                autoCorrect={false}
              />
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                array={data}
                placeholder="Brand"
                returnKeyType="next"
                name="brand"
                value={values.brand}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onSubmitEditing={() => sellerRef.current.focus()}
                ref={brandRef}
                autoCompleteType="off"
                autoCorrect={false}
              />
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                value={values.seller}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                array={data}
                name="seller"
                placeholder="Seller"
                returnKeyType="next"
                onSubmitEditing={() => soldRef.current.focus()}
                ref={sellerRef}
                autoCompleteType="off"
                autoCorrect={false}
              />
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                value={values.region}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                array={data}
                returnKeyType="next"
                name="region"
                onSubmitEditing={() => {
                  sizeRef.current.focus();
                }}
                ref={soldRef}
                placeholder="Region"
                autoCompleteType="off"
                autoCorrect={false}
              />
            </Layout>
            <Layout style={styles.packageContainerm} level="4">
              <Layout style={styles.rowContainer} level="4">
                <SizeInput
                  placeholder="Package Size"
                  value={values.size}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  name="size"
                  styles={styles.input}
                  onSubmitEditing={() => {
                    unitsRef.current.focus();
                  }}
                  ref={sizeRef}
                />
              </Layout>
              <Layout style={styles.rowContainer} level="4">
                <Selector
                  placeholder="Unit"
                  style={styles.input}
                  value={values.unit}
                  name="unit"
                  data={unitsArray}
                  selectedIndex={selectedIndex}
                  onSelect={(index) => {
                    console.log(unitsArray[index.row]);
                    priceRef.current.focus();
                    setSelectedIndex(index);
                    setFieldValue('unit', unitsArray[index.row]);
                  }}
                  ref={unitsRef}
                />
              </Layout>
              <Layout style={styles.rowContainer} level="4">
                <PriceInput
                  placeholder="Price"
                  value={values.price}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  style={styles.input}
                  name="price"
                  onSubmitEditing={handleSubmit}
                  ref={priceRef}
                />
              </Layout>
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <Button
                size="large"
                status="primary"
                style={styles.button}
                accessoryLeft={addIcon}
                onPress={handleSubmit}
                appearance="filled">
                Add New Ingredient
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
// 	"package_size": 1000
// }

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    width: '90%',
    // margin: 2,
  },
  button: {
    // flex: 1,
    // width: '100%',
    // margin: 2,
  },
  container: {height: '80%', marginTop: 10},
  rowContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 15,
    // margin: 2,
    width: '100%',
    height: '100%',
    // padding: 6,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddIngredientForm;
