import React, {useRef} from 'react';
import {View, Alert} from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from './extra/profile-avatar';
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  PlusIcon,
} from './extra/icons.js';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {useNavigation} from '@react-navigation/native';
import {ImageOverlay} from '../Login/extra/image-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const SignUp = () => {
  const {t, i18n} = useTranslation();
  const signUpfail = useSelector(state => state.auth.failed);
  const signUpSuccess = useSelector(state => state.auth.success);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const forthRef = useRef(null);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    if (termsAccepted && email && userName && password) {
      dispatch.auth.signUpAsync({
        email: email,
        username: userName,
        password: password,
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

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEditAvatarButton = () => (
    <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  );

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
        source={require('./assets/ramen.jpeg')}
      />
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="User Name"
          ref={firstRef}
          onSubmitEditing={() => {
            secondRef.current.focus();
          }}
          accessoryRight={PersonIcon}
          value={userName}
          onChangeText={text => setUserName(text.toLowerCase().trim())}
        />
        <Input
          style={styles.emailInput}
          autoCapitalize="none"
          onSubmitEditing={() => {
            thirdRef.current.focus();
          }}
          placeholder="Email"
          ref={secondRef}
          accessoryRight={EmailIcon}
          value={email}
          onChangeText={text => setEmail(text.trim())}
        />
        <Input
          style={styles.passwordInput}
          ref={thirdRef}
          autoCapitalize="none"
          secureTextEntry={!passwordVisible}
          placeholder="Password"
          accessoryRight={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          onChangeText={text => setPassword(text)}
          onIconPress={onPasswordIconPress}
        />
        <CheckBox
          style={styles.termsCheckBox}
          textStyle={styles.termsCheckBoxText}
          text={`I read and agreed to the Terms & Conditions`}
          checked={termsAccepted}
          onChange={checked => setTermsAccepted(checked)}>
          <Text>{'I read and accepted the Terms & Conditions'}</Text>
        </CheckBox>
      </Layout>
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
          status="basic"
          onPress={onSignInButtonPress}>
          Already have an account? Sign In
        </Button>
      </View>
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
    minHeight: 216,
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
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
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
