import {Button, Icon, Text, Layout} from '@ui-kitten/components';
import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import AutoCompleteField from '../molecules/AutocompleteField';
import {Field, Formik} from 'formik';

import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

const saveIcon = props => <Icon {...props} name="save-outline" />;

const AddRecipeForm = ({handleClose}) => {
  const {t, i18n} = useTranslation();
  // const navigation = useNavigation();
  const AddRecipeSchema = Yup.object().shape({
    name: Yup.string().required(t('Recipe_name_is_required')),
    description: Yup.string().required(t('Description_is_required')),
  });
  const nameRef = useRef();
  const descriptionRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    nameRef.current.focus();
  });

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
      }}
      validationSchema={AddRecipeSchema}
      onSubmit={values => {
        dispatch.recipes.addAsync({
          name: values.name,
          description: values.description,
        });
        handleClose();
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
        <Layout level="1">
          {/* <Text
            category="h4"
            appearance="alternative"
            status="basic"
            style={styles.title}>
            {t('Recipes_name')}
          </Text> */}
          <Layout style={styles.rowContainer} level="1">
            <AutoCompleteField
              style={styles.input}
              value={values.name}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              array={[]}
              name="name"
              status={errors.name && touched.name && 'danger'}
              placeholder={t('Recipes_name')}
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current.focus()}
              ref={nameRef}
              autoCompleteType="off"
              autoCorrect={false}
            />
            <Text category="c2" appearance="hint" status="danger">
              {errors.name && touched.name && errors.name}
            </Text>
          </Layout>
          <Layout style={styles.rowContainer} level="1">
            <AutoCompleteField
              style={styles.input}
              value={values.description}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              array={[]}
              name="description"
              status={errors.description && touched.description && 'danger'}
              placeholder={t('Description')}
              returnKeyType="next"
              onSubmitEditing={() => {}}
              ref={descriptionRef}
              autoCompleteType="off"
              autoCorrect={false}
            />
            <Text category="c2" appearance="hint" status="danger">
              {errors.description && touched.description && errors.description}
            </Text>
          </Layout>
          <Layout style={styles.submit} level="1">
            <Button onPress={handleSubmit}>{t('CREATE_RECIPE')}</Button>
          </Layout>
        </Layout>
      )}
    </Formik>
  );
};
// {
// 	"name": "Coca-Cola",
// 	"brand": "Coca-Cola",
// 	"name": "Pao de Acucar",
// 	"sold_region": "Campo Belo",
// 	"package_price": 6.5,
// 	"unit": "mL",
// 	"package_size": 3000
// }

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: 'white',
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

  rowContainer: {
    marginVertical: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submit: {
    marginTop: 10,
  },
  controlContainer: {
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  packageContainer: {
    borderRadius: 5,

    width: '100%',
    height: '40%',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddRecipeForm;
