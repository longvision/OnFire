import React from 'react';
import {Spinner, Layout, Text} from '@ui-kitten/components';

const styles = {
  loading: {
    height: 44,
  },
};

export default Loading = ({label, size, status, show}) => (
  <Layout style={styles.loading}>
    <Text>
      {label} = <Text>{show.toString()}</Text>
    </Text>
    {show && <Spinner status={status} size={size} />}
  </Layout>
);
