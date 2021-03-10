import React from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';
import {Button, Input, Text, Layout} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.js';
import {EyeIcon, EyeOffIcon, PersonIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {useDispatch} from 'react-redux';
const Login = ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const dispatch = useDispatch();
  const onSignInButtonPress = () => {
    // navigation && navigation.navigate('');
    dispatch.auth.loginAsync({password: password, email: email});
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('Login');
  };

  const onForgotPasswordButtonPress = () => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <ImageOverlay
        style={styles.container}
        source={require('./images/Sesame-Steak-Salad.jpeg')}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Hello
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Sign in to your account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Layout style={styles.inputContainer}>
            <Input
              status="control"
              placeholder="Email"
              autoCapitalize="none"
              icon={PersonIcon}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              style={styles.passwordInput}
              status="control"
              placeholder="Password"
              icon={passwordVisible ? EyeIcon : EyeOffIcon}
              value={password}
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              onIconPress={onPasswordIconPress}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="control"
                onPress={onForgotPasswordButtonPress}>
                Forgot your password?
              </Button>
            </View>
          </Layout>
        </View>
        <Layout style={styles.buttonContainer}>
          <Button
            style={styles.signInButton}
            status="control"
            size="giant"
            onPress={onSignInButtonPress}>
            SIGN IN
          </Button>

          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            onPress={onSignUpButtonPress}>
            Don't have an account? Sign Up
          </Button>
        </Layout>
      </ImageOverlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: '#0E490E',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    opacity: 0.9,
  },
  buttonContainer: {
    backgroundColor: '#0E490E',
    width: '100%',
    padding: 20,
    paddingVertical: 40,
    borderRadius: 5,
    opacity: 0.9,
  },
  signInLabel: {
    marginTop: 16,
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

export default Login;
