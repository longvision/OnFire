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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const emailRef = useRef(null);
  const passwordLoginRef = useRef(null);
  const dispatch = useDispatch();
  const onSignInButtonPress = () => {
    // navigation && navigation.navigate('');
    dispatch.auth.loginAsync({password: password, email: email});
  };

  const onSignUpButtonPress = () => {
    navigation.navigate('SignUp');
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
        source={require('./images/image-background.jpeg')}>
        <View style={styles.formContainer} level="4">
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              // justifyContent: 'flex-start',

              alignItems: 'center',
            }}>
            <Image
              style={{width: 350, height: 200}}
              resizeMode="contain"
              source={require('../../../assets/logo.png')}
            />
          </View>

          <ImageOverlay style={styles.inputContainer}>
            <Text style={styles.signInLabel} category="s1" status="control">
              {t('SIGN_INTO')}
            </Text>
            <Input
              status="control"
              placeholder="Email"
              autoCapitalize="none"
              accessoryRight={PersonIcon}
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordLoginRef.current.focus();
              }}
              value={email}
              onChangeText={text => setEmail(text.trim())}
            />
            <Input
              style={styles.passwordInput}
              status="control"
              placeholder="Password"
              returnKeyType="done"
              accessoryRight={passwordVisible ? EyeIcon : EyeOffIcon}
              value={password}
              ref={passwordLoginRef}
              secureTextEntry={!passwordVisible}
              onSubmitEditing={onSignInButtonPress}
              onChangeText={text => setPassword(text.trim())}
              onIconPress={onPasswordIconPress}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="control"
                onPress={onForgotPasswordButtonPress}>
                {t('FORGOT_PASS')}
              </Button>
            </View>
          </ImageOverlay>
        </View>
        <ImageOverlay style={styles.buttonContainer}>
          <Button
            style={styles.signInButton}
            status="primary"
            size="giant"
            onPress={onSignInButtonPress}>
            {t('SIGN_IN')}
          </Button>
          <ImageOverlay style={styles.noAccount}>
            <Button
              style={styles.signUpButton}
              status="control"
              appearance="ghost"
              onPress={onSignUpButtonPress}>
              {t('NO_ACCOUNT')}
            </Button>
          </ImageOverlay>
        </ImageOverlay>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overlayColor: 'rgba(0, 0, 0, 0.250)',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // minHeight: 216,
    flex: 1,
  },
  noAccount: {
    height: 44,
    overlayColor: 'rgba(0, 0, 0, 0.0)',
    marginTop: 22,
    marginBottom: 44,
  },
  formContainer: {
    flex: 1,
    // marginTop: 152,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    // marginBottom: 50,
    marginTop: 30,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    backgroundColor: 'transparent',

    // flex: 1,
    paddingTop: 20,
  },
  signInLabel: {
    marginBottom: 16,
    alignItems: 'center',
  },
  signInButton: {
    marginHorizontal: 10,
  },
  signUpButton: {
    // marginHorizontal: 16,
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
