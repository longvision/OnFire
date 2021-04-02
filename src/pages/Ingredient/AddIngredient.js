import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const AddIngredient = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const failed = useSelector((state) => state.measures.failed);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  React.useEffect(() => {
    failed &&
      Alert.alert(
        t('Generic_Error'),
        t('Generic_Error_Description'),
        [
          {
            text: 'Ok',
            onPress: () => {
              dispatch.measures.alertOff();
            },
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            dispatch.measures.alertOff();
          },
        },
      );
  }, [failed]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={t('Ingredients')}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <EditIngredientTemplate />
      </Layout>
    </SafeAreaView>
  );
};
