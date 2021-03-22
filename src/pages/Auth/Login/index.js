import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import {Button, Input, Text, Layout} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.js';
import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';

export const Login = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const emailRef = useRef(null);
  const passwordLoginRef = useRef(null);
  const dispatch = useDispatch();
  const onSignInButtonPress = () => {
    // navigation && navigation.navigate('');
    dispatch.auth.loginAsync({password: password, email: email});
  };

  const onSignUpButtonPress = () => {
    navigation.navigate('Login');
  };

  const onForgotPasswordButtonPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ImageOverlay
        style={styles.container}
        source={require('./images/Sesame-Steak-Salad.jpeg')}>
        <View style={styles.headerContainer}>
          <Layout
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text category="h1" status="control" style={styles.title}>
              {t('Hello')}
            </Text>
          </Layout>
        </View>
        <Layout style={styles.formContainer} level="4">
          <Text style={styles.signInLabel} category="s1" status="basic">
            {t('SIGN_INTO')}
          </Text>
          <Layout style={styles.inputContainer} level="4">
            <Input
              status="primary"
              placeholder="Email"
              autoCapitalize="none"
              icon={PersonIcon}
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordLoginRef.current.focus();
              }}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              style={styles.passwordInput}
              status="primary"
              placeholder="Password"
              returnKeyType="done"
              icon={passwordVisible ? EyeIcon : EyeOffIcon}
              value={password}
              ref={passwordLoginRef}
              secureTextEntry={!passwordVisible}
              onSubmitEditing={onSignInButtonPress}
              onChangeText={setPassword}
              onIconPress={onPasswordIconPress}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="basic"
                onPress={onForgotPasswordButtonPress}>
                Forgot your password?
              </Button>
            </View>
          </Layout>
        </Layout>
        <Layout style={styles.buttonContainer}>
          <Button
            style={styles.signInButton}
            status="primary"
            size="giant"
            onPress={onSignInButtonPress}>
            {t('SIGN_IN')}
          </Button>

          <Button
            style={styles.signUpButton}
            status="control"
            appearance="ghost"
            onPress={onSignUpButtonPress}>
            {t('NO_ACCOUNT')}
          </Button>
        </Layout>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // minHeight: 216,
    flex: 1,
  },
  formContainer: {
    flex: 2,
    // marginTop: 32,
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 20,
  },
  signInLabel: {
    marginTop: 16,
    alignItems: 'center',
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
