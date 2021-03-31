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
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

const data = [];

const saveIcon = props => <Icon {...props} name="save-outline" />;
const editIcon = props => <Icon {...props} name="edit-outline" />;
const closeIcon = props => <Icon {...props} name="close-outline" />;

const AddIngredientSchema = Yup.object().shape({
  ingredient: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Ingredient name is required'),
  brand: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Brand is required'),
  seller: Yup.string().required('Seller name is required'),
  region: Yup.string(),
  size: Yup.string().required('Package size is required'),
  unit: Yup.string().required('Package unit is required'),
  price: Yup.string().required('Package price is required'),
});
const EditIngredientForm = ({selectedItem}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [formattedSize, setFormattedSize] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [selectedUnit, setSelectedUnit] = React.useState('');
  const [packDisabled, setPackDisabled] = React.useState(true);
  const [formattedPrice, setFormattedPrice] = React.useState('');
  const navigation = useNavigation();
  const brandRef = useRef();
  const sellerRef = useRef();
  const soldRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();
  const sizeRef = useRef();
  const unitsArray = ['mL', 'g', 'L', 'KG'];

  const handleEditPackage = () => {
    setPackDisabled(!packDisabled);
  };
  const handleEditInfo = () => {
    setDisabled(!disabled);
  };

  return (
    <Formik
      initialValues={{
        ingredient: selectedItem.name,
        brand: selectedItem.brand,
        seller: selectedItem.seller,
        region: selectedItem.sold_region,
        size: Number(selectedItem.package_size).toFixed(2),
        unit: selectedItem.unit,
        price: Number(selectedItem.package_price).toFixed(2),
      }}
      validationSchema={AddIngredientSchema}
      onSubmit={values => {
        values.size = formattedSize ? formattedSize : values.size;
        values.price = formattedPrice ? formattedPrice : values.price;
        dispatch.ingredients.updateAsync({values: values, id: selectedItem.id});

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
        // <ScrollView style={{height: '100%'}}>
        <Layout style={styles.container}>
          <Layout style={styles.controlContainer}>
            <Layout style={styles.productLayout} level="3">
              <Text
                category="h4"
                appearance="alternative"
                status="basic"
                style={styles.packageTitle}>
                {t('Product_info')}
              </Text>
              <Button
                style={styles.editPackage}
                status="basic"
                size="medium"
                onPress={handleEditInfo}
                accessoryLeft={disabled ? editIcon : closeIcon}
              />
            </Layout>

            <Layout style={styles.rowContainer} level="1">
              <AutoCompleteField
                style={styles.input}
                array={data}
                name="ingredient"
                returnKeyType="next"
                editing={true}
                disabled={disabled}
                setDisabled={setDisabled}
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
                disabled={disabled}
                editing={true}
                setDisabled={setDisabled}
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
                disabled={disabled}
                editing={true}
                setDisabled={setDisabled}
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
                editing={true}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                disabled={disabled}
                setDisabled={setDisabled}
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
              <Layout style={styles.packageLayout} level="3">
                <Text
                  category="h4"
                  appearance="alternative"
                  status="basic"
                  style={styles.packageTitle}>
                  {t('Package_Info')}
                </Text>
                <Button
                  style={styles.editPackage}
                  status="basic"
                  size="medium"
                  onPress={handleEditPackage}
                  accessoryLeft={packDisabled ? editIcon : closeIcon}
                />
              </Layout>
              <Layout style={styles.quantityDiv} level="3">
                <Layout style={styles.quantityRow2} level="3">
                  <Selector
                    status={errors.unit && touched.unit && 'danger'}
                    placeholder={t('Package_Unit')}
                    style={styles.input}
                    value={values.unit}
                    disabled={packDisabled}
                    name="unit"
                    data={unitsArray}
                    selectedIndex={selectedIndex}
                    onSelect={index => {
                      setSelectedIndex(index);
                      setFieldValue('unit', unitsArray[index.row]);
                      setFieldValue('size', '');
                      setFormattedSize('');
                      setSelectedUnit(unitsArray[index.row]);
                    }}
                    ref={unitsRef}
                  />
                  <Text category="c2" appearance="hint" status="danger">
                    {errors.unit && touched.unit && errors.unit}
                  </Text>
                </Layout>
                <Layout style={styles.quantityRow1} level="3">
                  <SizeInput
                    status={errors.size && touched.size && 'danger'}
                    placeholder={t('Package_Size')}
                    value={values.size}
                    setFieldValue={setFieldValue}
                    unit={selectedUnit ? selectedUnit : values.unit}
                    setFieldTouched={setFieldTouched}
                    disabled={packDisabled}
                    setDisabled={setDisabled}
                    setFormattedSize={setFormattedSize}
                    mantissa={2}
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
              </Layout>

              <Layout style={styles.rowContainer} level="3">
                <PriceInput
                  status={errors.price && touched.price && 'danger'}
                  placeholder={t('Package_Price')}
                  disabled={packDisabled}
                  value={values.price}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  setFormattedPrice={setFormattedPrice}
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
                {t('Save')}
              </Button>
            </Layout>
          </Layout>
        </Layout>
        // </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    color: 'black',
  },
  title: {
    marginBottom: 20,
  },
  quantityDiv: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
  packageTitle: {
    marginLeft: 100,
    flex: 3,
  },
  productLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    width: '100%',
    height: 80,
  },
  packageLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  editPackage: {
    // margin: 2,
  },
  button: {
    // flex: 1,
    // width: '100%',
    marginTop: 10,
    // margin: 2,
  },
  container: {
    // height: '100%',
    marginTop: 20,
    paddingBottom: 35,
    marginBottom: 35,
  },
  rowContainer: {
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityRow1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  quantityRow2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
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
