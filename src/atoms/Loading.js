import React from 'react';
import {Spinner, Layout, Text} from '@ui-kitten/components';
import {View} from 'react-native';

const styles = {
  loading: {
    height: 44,
    justifyContent: 'center',
  },
};

export default Loading = ({label, size, status, show}) => (
  <View
    style={{
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      marginTop: 50,
    }}>
    <View style={styles.loading}>
      {show && <Spinner status={status} size={size} />}
    </View>
  </View>
);
