import React, { useRef } from 'react';
import { View, Alert } from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ImageOverlay } from '../Login/extra/image-overlay';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { EmailIcon, PersonIcon, PassIcon } from './extra/icons.js';

export const SignUp = () => {
  const { t, i18n } = useTranslation();
  const signUpfail = useSelector((state) => state.auth.failed);
  const signUpSuccess = useSelector((state) => state.auth.success);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userError, setUserError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  // const [passwordVisible, setPasswordVisible] = React.useState(false);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const forthRef = useRef(null);

  const styles = useStyleSheet(themedStyles);

  const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onSignUpButtonPress = () => {
    if (termsAccepted && email && userName && password) {
      dispatch.auth.signUpAsync({
        email,
        username: userName,
        password,
      });
    } else {
      Alert.alert(
        t('Complete_the_form'),
        t('Terms_and_conditions'),
        [
          {
            text: 'Ok',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        },
      );
    }
  };

  const onSignInButtonPress = () => {
    navigation.navigate('Login');
  };

  // const onPasswordIconPress = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  // const renderEditAvatarButton = () => (
  //   <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  // );

  React.useEffect(() => {
    signUpfail &&
      Alert.alert(
        t('Reset_failed'),
        t('Retry_reset'),
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
    signUpSuccess &&
      Alert.alert(
        t('Account_created'),
        t('Login_now'),
        [
          {
            text: 'Ok',
            onPress: () => {
              dispatch.auth.alertOff();
              navigation.navigate('Login');
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            dispatch.auth.alertOff();
            navigation.navigate('Login');
          },
        },
      );
  }, [signUpSuccess, signUpfail]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={styles.headerContainer}> */}
      <ImageOverlay
        style={styles.headerContainer}
        source={require('./assets/background.jpeg')}>
        <View style={styles.inputContainer}>
          <Layout style={styles.formContainer}>
            <Input
              autoCapitalize="none"
              placeholder="User Name"
              status="control"
              ref={firstRef}
              onSubmitEditing={() => {
                if (!usernameRegex.test(userName)) {
                  setUserName('');
                  setUserError(true);
                } else {
                  secondRef.current.focus();
                  setUserError(false);
                }
              }}
              autoCorrect={false}
              accessoryRight={PersonIcon}
              value={userName}
              onChangeText={(text) => setUserName(text.toLowerCase().trim())}
            />
            {userError && (
              <Text category="s2" status="warning">
                {t('userError')}
              </Text>
            )}
            <Input
              style={styles.emailInput}
              autoCapitalize="none"
              status="control"
              onSubmitEditing={() => {
                if (!emailRegex.test(email)) {
                  setEmail('');
                  setEmailError(true);
                } else {
                  thirdRef.current.focus();
                  setEmailError(false);
                }
              }}
              keyboardType="email-address"
              placeholder="Email"
              ref={secondRef}
              accessoryRight={EmailIcon}
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
            />
            {emailError && (
              <Text category="s2" status="warning">
                {t('emailError')}
              </Text>
            )}
            <Input
              style={styles.passwordInput}
              ref={thirdRef}
              autoCapitalize="none"
              status="control"
              secureTextEntry={true}
              placeholder="Password"
              accessoryRight={PassIcon}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <CheckBox
              style={styles.termsCheckBox}
              status="control"
              textStyle={styles.termsCheckBoxText}
              text={'I read and agreed to the Terms & Conditions'}
              checked={termsAccepted}
              onChange={(checked) => setTermsAccepted(checked)}>
              <Text status="control">
                {'I read and accepted the Terms & Conditions'}
              </Text>
            </CheckBox>
          </Layout>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.signUpButton}
            size="giant"
            onPress={onSignUpButtonPress}>
            SIGN UP
          </Button>
          <Button
            style={styles.signInButton}
            appearance="ghost"
            status="control"
            onPress={onSignInButtonPress}>
            Already have an account? Sign In
          </Button>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'color-primary-default',
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'color-primary-default',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 24,

    flex: 1,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.750)',
    // paddingTop: 40,
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    backgroundColor: 'transparent',
    // paddingTop: 32,
    // marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'background-basic-color-1',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
