import React from 'react';
import {Spinner, Layout, Text} from '@ui-kitten/components';
import {View} from 'react-native';

const styles = {
  loading: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Loading = ({label, size, status, show}) => (
  <View
    style={{
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      marginTop: 50,
      // marginBottom: 15,
      borderWidth: 2,
      borderColor: '#6937F4',
      opacity: 0.9,
      zIndex: 100,
      backgroundColor: 'white',
      position: 'absolute',
      top: '40%',
      left: '40%',
      borderRadius: 15,
    }}>
    <View style={styles.loading}>
      <Text status="info" category="s1" style={{marginBottom: 15}}>
        {label}
      </Text>
      {show && <Spinner status={status} size={size} />}
    </View>
  </View>
);
