import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

const ListTitle = ({ titles }) => (
    <Layout
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}>
      {titles.map((item) => (
        <Layout key={item}>
          <Text category="h5">{item}</Text>
        </Layout>
      ))}
    </Layout>
);

export default ListTitle;
