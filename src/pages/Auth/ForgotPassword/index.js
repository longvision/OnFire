import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay';
import {EmailIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const ForgotPassword = () => {
  const {t, i18n} = useTranslation();
  const failed = useSelector((state) => state.auth.failed);
  const recoveryAlert = useSelector((state) => state.auth.recoveryToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
      appearance="control"
    />
  );
  const onResetPasswordButtonPress = () => {
    dispatch.auth.forgotPasswordAsync({email: email});
  };

  React.useEffect(() => {
    failed &&
      Alert.alert(
        t('Invalid_Email'),
        t('Check_Email'),
        [
          {
            text: 'Ok',
            onPress: () => {
              dispatch.auth.alertOff();
            },
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            dispatch.auth.alertOff();
          },
        },
      );
    recoveryAlert &&
      Alert.alert(
        t('Valid_Email'),
        t('Check_Inbox'),
        [
          {
            text: 'Ok',
            onPress: () => {
              dispatch.auth.alertOff();
              navigation.navigate('Recovery');
            },
            style: 'default',
          },
        ],
        {
          cancelable: false,
          onDismiss: () => {
            dispatch.auth.alertOff();
            navigation.navigate('Recovery');
          },
        },
      );
  }, [failed, recoveryAlert]);

  return (
    <ImageOverlay
      style={styles.container}
      source={require('./assets/image-background.jpg')}>
      <KeyboardAvoidingView>
        <TopNavigation
          appearance="control"
          style={{backgroundColor: 'transparent'}}
          alignment="center"
          accessoryLeft={BackAction}
        />
        <Text style={styles.forgotPasswordLabel} status="control" category="h4">
          {t('Forgot_Password')}
        </Text>
        <Text style={styles.enterEmailLabel} status="control">
          {t('Enter_email')}
        </Text>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={onResetPasswordButtonPress}
            icon={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button size="giant" onPress={onResetPasswordButtonPress}>
            {t('RESET_PASSWORD')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ImageOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 24,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',

    marginTop: 24,
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 24,
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 64,
  },
});
