import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Input } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';
const Visibility = (props) => (
  <MaterialCommunityIcons
    {...props}
    style={styles.icon}
    size={24}
    name={props.visible ? 'eye-off' : 'eye'}
  />
);
const PasswordInputField = (
  {
    handlePress,
    password,
    passwordVisible,
    onSignInButtonPress,
    onSubmitEditing,
    ...props
  },
  ref,
) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return (
    <View style={styles.container}>
      <Input
        {...props}
        style={styles.password}
        status="control"
        placeholder="Password"
        returnKeyType="done"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={passwordVisible}
        ref={inputRef}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity onPress={handlePress}>
        <Visibility visible={passwordVisible} />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput = forwardRef(PasswordInputField);

const styles = StyleSheet.create({
  password: {
    width: '92%',
  },
  container: {
    // width: 350,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white',
    marginLeft: 5,

    // width: 40,
    // height: 40,
  },
});
