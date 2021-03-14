import {
  Button,
  Icon,
  Input,
  Text,
  Layout,
  StyleService,
} from '@ui-kitten/components';
import React, {useRef, useImperativeHandle, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PriceInput from '../molecules/PriceInput';
import AutoCompleteField from '../molecules/AutocompleteField';
import {Field, Formik} from 'formik';
import Selector from '../molecules/Selector';
import SizeInput from '../molecules/SizeInput';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

const data = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
];

const saveIcon = (props) => <Icon {...props} name="save-outline" />;

const AddIngredientSchema = Yup.object().shape({
  ingredient: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Ingredient name is qequired'),
  brand: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Brand is required'),
  seller: Yup.string().required('Seller name is required'),
  region: Yup.string(),
  size: Yup.number().moreThan(0).required('Package size is required'),
  unit: Yup.string().required('Package unit is required'),
  price: Yup.string().required('Package price is required'),
});
const EditIngredientForm = ({selectedItem}) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigation = useNavigation();
  const brandRef = useRef();
  const sellerRef = useRef();
  const soldRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();
  const sizeRef = useRef();
  const unitsArray = ['mL', 'g', 'L', 'KG'];

  return (
    <Formik
      initialValues={{
        ingredient: selectedItem.ingredient,
        brand: selectedItem.brand,
        seller: selectedItem.seller,
        region: selectedItem.region,
        size: selectedItem.size,
        unit: selectedItem.unit,
        price: selectedItem.price,
      }}
      validationSchema={AddIngredientSchema}
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
        errors,
        touched,
        values,
      }) => (
        <Layout style={styles.container}>
          <Layout style={styles.controlContainer}>
            <Text
              category="h4"
              appearance="alternative"
              status="basic"
              style={styles.title}>
              Product info
            </Text>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                array={data}
                name="ingredient"
                returnKeyType="next"
                disabled
                value={values.ingredient}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onSubmitEditing={() => brandRef.current.focus()}
                status={errors.ingredient && touched.ingredient && 'danger'}
                placeholder="Ingredient Name"
                autoCompleteType="off"
                autoCorrect={false}
              />
              <Text category="c2" appearance="hint" status="danger">
                {errors.ingredient && touched.ingredient && errors.ingredient}
              </Text>
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                array={data}
                returnKeyType="next"
                disabled
                name="brand"
                value={values.brand}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onSubmitEditing={() => sellerRef.current.focus()}
                status={errors.brand && touched.brand && 'danger'}
                placeholder="Brand"
                ref={brandRef}
                autoCompleteType="off"
                autoCorrect={false}
              />
              <Text category="c2" appearance="hint" status="danger">
                {errors.brand && touched.brand && errors.brand}
              </Text>
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                value={values.seller}
                setFieldValue={setFieldValue}
                disabled
                setFieldTouched={setFieldTouched}
                array={data}
                name="seller"
                status={errors.seller && touched.seller && 'danger'}
                placeholder="Seller"
                returnKeyType="next"
                onSubmitEditing={() => soldRef.current.focus()}
                ref={sellerRef}
                autoCompleteType="off"
                autoCorrect={false}
              />
              <Text category="c2" appearance="hint" status="danger">
                {errors.seller && touched.seller && errors.seller}
              </Text>
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                value={values.region}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                disabled
                array={data}
                returnKeyType="next"
                name="region"
                onSubmitEditing={() => {
                  sizeRef.current.focus();
                }}
                ref={soldRef}
                status={errors.region && touched.region && 'danger'}
                placeholder="Region"
                autoCompleteType="off"
                autoCorrect={false}
              />
              <Text category="c2" appearance="hint" status="danger">
                {errors.region && touched.region && errors.region}
              </Text>
            </Layout>
            <Layout style={styles.packageContainer} level="3">
              <Text
                category="h4"
                appearance="alternative"
                status="basic"
                style={styles.title}>
                Package info
              </Text>
              <Layout style={styles.rowContainer} level="3">
                <SizeInput
                  status={errors.size && touched.size && 'danger'}
                  placeholder="Package Size"
                  value={values.size}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  disabled
                  name="size"
                  styles={styles.input}
                  onSubmitEditing={() => {
                    unitsRef.current.focus();
                  }}
                  ref={sizeRef}
                />
                <Text category="c2" appearance="hint" status="danger">
                  {errors.size && touched.size && errors.size}
                </Text>
              </Layout>
              <Layout style={styles.rowContainer} level="3">
                <Selector
                  status={errors.unit && touched.unit && 'danger'}
                  placeholder="Unit"
                  style={styles.input}
                  value={values.unit}
                  disabled
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
                <Text category="c2" appearance="hint" status="danger">
                  {errors.unit && touched.unit && errors.unit}
                </Text>
              </Layout>
              <Layout style={styles.rowContainer} level="3">
                <PriceInput
                  status={errors.price && touched.price && 'danger'}
                  placeholder="Price"
                  disabled
                  value={values.price}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  style={styles.input}
                  name="price"
                  mantissa={2}
                  onSubmitEditing={handleSubmit}
                  ref={priceRef}
                />
                <Text category="c2" appearance="hint" status="danger">
                  {errors.price && touched.price && errors.price}
                </Text>
              </Layout>
            </Layout>
            <Layout style={styles.rowContainer} level="1">
              <Button
                size="large"
                status="primary"
                style={styles.button}
                accessoryLeft={saveIcon}
                onPress={handleSubmit}
                appearance="filled">
                Save
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
    width: '90%',
  },
  title: {
    marginBottom: 20,
  },
  button: {
    // flex: 1,
    // width: '100%',
    marginTop: 10,
    // margin: 2,
  },
  container: {height: '100%', marginTop: 20},
  rowContainer: {
    marginVertical: 3,
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
    borderRadius: 5,
    // margin: 2,
    width: '100%',
    height: '40%',
    // padding: 6,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditIngredientForm;
