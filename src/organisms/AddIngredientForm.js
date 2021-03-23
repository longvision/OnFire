import {
  Button,
  Icon,
  Input,
  Text,
  Layout,
  StyleService,
} from '@ui-kitten/components';
import React, {useRef, useImperativeHandle, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PriceInput from '../molecules/PriceInput';
import AutoCompleteField from '../molecules/AutocompleteField';
import {Field, Formik} from 'formik';
import Selector from '../molecules/Selector';
import SizeInput from '../molecules/SizeInput';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

const data = [];

const saveIcon = (props) => <Icon {...props} name="save-outline" />;

const AddIngredientForm = () => {
  const {t, i18n} = useTranslation();
  const brandRef = useRef();
  const sellerRef = useRef();
  const soldRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();
  const sizeRef = useRef();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [disabled, setDisabled] = React.useState(false);
  const navigation = useNavigation();
  const unitsArray = ['mL', 'g', 'L', 'KG'];

  const AddIngredientSchema = Yup.object().shape({
    ingredient: Yup.string()
      .min(2, t('Too_Short'))
      .max(50, t('Too_Long'))
      .required(t('Ingredient_name_is_required')),
    brand: Yup.string()
      .min(2, t('Too_Short'))
      .max(50, t('Too_Long'))
      .required(t('Brand_is_required')),
    seller: Yup.string().required(t('Seller_is_required')),
    region: Yup.string(),
    size: Yup.number().moreThan(0).required(t('Package_size_is_required')),
    unit: Yup.string().required(t('Package_unit_is_required')),
    price: Yup.string().required(t('Package_price_is_required')),
  });

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
      validationSchema={AddIngredientSchema}
      onSubmit={(values) => {
        dispatch.ingredients.addAsync(values);
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
        <ScrollView style={{height: '100%'}}>
          <Layout style={styles.container}>
            <Layout style={styles.controlContainer}>
              <Text
                category="h4"
                appearance="alternative"
                status="basic"
                style={styles.title}>
                {t('Product_info')}
              </Text>
              <Layout style={styles.rowContainer} level="1">
                <AutoCompleteField
                  style={styles.input}
                  array={data}
                  name={t('ingredient')}
                  returnKeyType="next"
                  value={values.ingredient}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  onSubmitEditing={() => brandRef.current.focus()}
                  status={errors.ingredient && touched.ingredient && 'danger'}
                  placeholder={t('Ingredient_Name')}
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
                  name="brand"
                  value={values.brand}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  onSubmitEditing={() => sellerRef.current.focus()}
                  status={errors.brand && touched.brand && 'danger'}
                  placeholder={t('Brand')}
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
                  setFieldTouched={setFieldTouched}
                  array={data}
                  name="seller"
                  status={errors.seller && touched.seller && 'danger'}
                  placeholder={t('Seller')}
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
                  array={data}
                  returnKeyType="next"
                  name="region"
                  onSubmitEditing={() => {
                    sizeRef.current.focus();
                  }}
                  ref={soldRef}
                  status={errors.region && touched.region && 'danger'}
                  placeholder={t('Region')}
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
                  {t('Package_Info')}
                </Text>
                <Layout style={styles.rowContainer} level="3">
                  <SizeInput
                    status={errors.size && touched.size && 'danger'}
                    placeholder={t('Package_Size')}
                    value={values.size}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    name="size"
                    styles={styles.input}
                    mantissa={4}
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
                    placeholder={t('Package_Unit')}
                    style={styles.input}
                    value={values.unit}
                    name="unit"
                    data={unitsArray}
                    selectedIndex={selectedIndex}
                    onSelect={(index) => {
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
                    placeholder={t('Package_Price')}
                    value={values.price}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    mantissa={4}
                    style={styles.input}
                    name="price"
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
                  {t('Save')}
                </Button>
              </Layout>
            </Layout>
          </Layout>
        </ScrollView>
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
  controlContainer: {
    // margin: 2,
    width: '100%',
    height: '100%',
    // padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageContainer: {
    // margin: 2,
    width: '100%',
    height: '40%',
    // padding: 6,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddIngredientForm;
