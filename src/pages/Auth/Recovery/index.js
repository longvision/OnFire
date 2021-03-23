import React, {useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const Recovery = () => {
  const {t, i18n} = useTranslation();
  const Tref = useRef(null);
  const Oref = useRef(null);
  const Kref = useRef(null);
  const Eref = useRef(null);
  const Nref = useRef(null);
  const passRef = useRef();
  const confirmRef = useRef();
  const failed = useSelector((state) => state.auth.failed);
  const recoveryAlert = useSelector((state) => state.auth.recoveryToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState([]);
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');

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
  const handleSubmit = () => {
    // dispatch.auth.forgotPasswordAsync({email: email});
    // navigation.goBack();
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
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            dispatch.auth.alertOff();
          },
        },
      );
  }, []);

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
          {t('Enter_Token')}
        </Text>
        <View style={styles.wraperContainer}>
          <View style={styles.tokenContainer}>
            <Input
              status="control"
              ref={Tref}
              placeholder="T"
              onFocus={() => {
                let array = [...token];
                array[0] = '';
                setToken(array);
              }}
              keyboardType="ascii-capable"
              autoCapitalize="characters"
              style={styles.token}
              value={token[0]}
              returnKeyType="next"
              onChangeText={(text) => {
                const data = [...token];
                data[0] = text.substring(0, 1);
                setToken(data);
                Oref.current.focus();
              }}
              onSubmitEditing={() => {
                Oref.current.focus();
              }}
            />
            <Input
              status="control"
              placeholder="O"
              ref={Oref}
              onFocus={() => {
                let array = [...token];
                array[1] = '';
                setToken(array);
              }}
              onSubmitEditing={() => {
                Kref.current.focus();
              }}
              style={styles.token}
              returnKeyType="next"
              keyboardType="ascii-capable"
              autoCapitalize="characters"
              value={token[1]}
              onChangeText={(text) => {
                const data = [...token];
                data[1] = text.substring(0, 1);
                setToken(data);
                Kref.current.focus();
              }}
            />
            <Input
              returnKeyType="next"
              status="control"
              placeholder="K"
              onFocus={() => {
                let array = [...token];
                array[2] = '';
                setToken(array);
              }}
              onSubmitEditing={() => {
                Eref.current.focus();
              }}
              ref={Kref}
              style={styles.token}
              keyboardType="ascii-capable"
              autoCapitalize="characters"
              value={token[2]}
              onChangeText={(text) => {
                const data = [...token];
                data[2] = text.substring(0, 1);
                setToken(data);
                Eref.current.focus();
              }}
            />
            <Input
              status="control"
              returnKeyType="next"
              onFocus={() => {
                let array = [...token];
                array[3] = '';
                setToken(array);
              }}
              placeholder="E"
              ref={Eref}
              onSubmitEditing={() => {
                Nref.current.focus();
              }}
              style={styles.token}
              keyboardType="ascii-capable"
              autoCapitalize="characters"
              value={token[3]}
              onChangeText={(text) => {
                const data = [...token];
                data[3] = text.substring(0, 1);
                setToken(data);
                Nref.current.focus();
              }}
            />
            <Input
              returnKeyType="next"
              status="control"
              placeholder="N"
              onFocus={() => {
                let array = [...token];
                array[4] = '';
                setToken(array);
              }}
              ref={Nref}
              style={styles.token}
              onSubmitEditing={() => {
                passRef.current.focus();
              }}
              keyboardType="ascii-capable"
              autoCapitalize="characters"
              value={token[4]}
              onChangeText={(text) => {
                const data = [...token];
                data[4] = text.substring(0, 1);
                setToken(data);
                passRef.current.focus();
              }}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Input
            returnKeyType="next"
            status="control"
            onSubmitEditing={() => {
              confirmRef.current.focus();
            }}
            placeholder="Password"
            ref={passRef}
            keyboardType="default"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formContainer}>
          <Input
            returnKeyType="send"
            status="control"
            placeholder="Password_confirmation"
            ref={confirmRef}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
            accessoryRight={EmailIcon}
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button size="giant" onPress={handleSubmit}>
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
  token: {width: 54, height: 54, marginHorizontal: 3, alignItems: 'center'},
  tokenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 24,
    flex: 1,
  },
  formContainer: {
    // flex: 1,
    justifyContent: 'center',
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
