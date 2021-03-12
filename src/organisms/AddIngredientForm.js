import {Input, Layout, StyleService} from '@ui-kitten/components';
import React, {useRef, useImperativeHandle, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PriceInput from '../molecules/PriceInput';
import AutoCompleteField from '../molecules/AutocompleteField';
import {Formik} from 'formik';
import Selector from '../molecules/Selector';
import SizeInput from '../molecules/SizeInput';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

const data = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
];

const AddIngredientForm = () => {
  const brandRef = useRef();
  const sellerRef = useRef();
  const soldRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();
  const sizeRef = useRef();

  function handleSubmit() {
    // dispatch(AuthActions.loginRequest(email, password));
    console.log('Submitted');
  }

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
      onSubmit={(values) => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <Layout style={styles.container}>
          <Layout style={styles.controlContainer}>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                array={data}
                name="ingredient"
                returnKeyType="next"
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
                onSubmitEditing={() => sellerRef.current.focus()}
                ref={brandRef}
                autoCompleteType="off"
                autoCorrect={false}
              />
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
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
                  placeholder="Package Size"
                  style={styles.input}
                  name="unit"
                  data={['mL', 'g', 'L', 'KG']}
                  onSelect={() => {
                    priceRef.current.focus();
                  }}
                  ref={unitsRef}
                />
              </Layout>
              <Layout style={styles.rowContainer} level="4">
                <PriceInput
                  placeholder="Price"
                  style={styles.input}
                  name="price"
                  onSubmitEditing={handleSubmit}
                  ref={priceRef}
                />
              </Layout>
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
