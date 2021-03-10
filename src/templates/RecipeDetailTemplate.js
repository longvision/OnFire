import React from 'react';

import {Layout, Text} from '@ui-kitten/components';

const RecipeDetailTemplate = ({list, summary, title, button}) => {
  return (
    <Layout
      style={{
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        height: '98%',
      }}>
      <Text>{title}</Text>
      {list}
      <Layout
        style={{
          marginVertical: 5,
          flexDirection: 'column',
          width: '100%',
        }}>
        {summary}
      </Layout>
    </Layout>
  );
};

export default RecipeDetailTemplate;
