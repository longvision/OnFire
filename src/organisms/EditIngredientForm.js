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
import {useDispatch, useSelector} from 'react-redux';
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
const editIcon = (props) => <Icon {...props} name="edit-outline" />;
const closeIcon = (props) => <Icon {...props} name="close-outline" />;

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
  const [disabled, setDisabled] = React.useState(true);
  const [packDisabled, setPackDisabled] = React.useState(true);
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
  console.log(selectedItem);
  return (
    <Formik
      initialValues={{
        ingredient: selectedItem.name,
        brand: selectedItem.brand,
        seller: selectedItem.seller,
        region: selectedItem.sold_region,
        size: selectedItem.package_size,
        unit: selectedItem.unit,
        price: selectedItem.package_price,
      }}
      validationSchema={AddIngredientSchema}
      onSubmit={(values) => {
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
        <Layout style={styles.container}>
          <Layout style={styles.controlContainer}>
            <Layout style={styles.packageLayout} level="3">
              <Text
                category="h4"
                appearance="alternative"
                status="basic"
                style={styles.packageTitle}>
                Product info
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
                disabled={disabled}
                editing={true}
                setDisabled={setDisabled}
                name="brand"
                value={values.brand || selectedItem.brand}
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
                value={values.seller || selectedItem.seller}
                setFieldValue={setFieldValue}
                disabled={disabled}
                editing={true}
                setDisabled={setDisabled}
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
                value={values.region || selectedItem.sold_region}
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
                placeholder="Region"
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
                  Package info
                </Text>
                <Button
                  style={styles.editPackage}
                  status="basic"
                  size="medium"
                  onPress={handleEditPackage}
                  accessoryLeft={packDisabled ? editIcon : closeIcon}
                />
              </Layout>
              <Layout style={styles.rowContainer} level="3">
                <SizeInput
                  status={errors.size && touched.size && 'danger'}
                  placeholder="Package Size"
                  value={values.size || selectedItem.package_size}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  disabled={packDisabled}
                  setDisabled={setDisabled}
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
                  value={values.unit || selectedItem.unit}
                  disabled={packDisabled}
                  name="unit"
                  data={unitsArray}
                  selectedIndex={selectedIndex}
                  onSelect={(index) => {
                    console.log(unitsArray[index.row]);
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
                  disabled={packDisabled}
                  value={values.price || selectedItem.package_price}
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
    color: 'black',
  },
  title: {
    marginBottom: 20,
  },
  packageTitle: {
    marginLeft: 100,
    flex: 3,
  },
  packageLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
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
