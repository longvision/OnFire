import React from 'react';
import {Button, Icon, List, Layout, Text} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Popularity from '../atoms/Popularity';
import ListTitle from '../atoms/ListTitle';

export const HighList = ({
  data,
  cta,
  rating,
  ratingTitle,
  handlePress,
  img,
  titles,
  assessoryLeft,
  btnSize,
  height,
  width,
  ...props
}) => {
  const renderItem = ({item, index}) => (
    <Layout
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 44,
        marginTop: 2,
        padding: 5,
      }}>
      <Layout>
        <Text category="s1">{item.title}</Text>
        <Text category="p2">{item.description}</Text>
      </Layout>
      <Layout>
        {rating && (
          <Popularity
            // title={ratingTitle}
            // start={2.556}
            // count={5}
            imageSize={15}
          />
        )}
      </Layout>
      <Layout>
        {cta && (
          <Button
            size={btnSize}
            onPress={handlePress}
            // status="basic"
            appearance="outline"
            accessoryLeft={assessoryLeft}>
            {cta}
          </Button>
        )}
      </Layout>
    </Layout>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      <Layout style={{width: width}}>
        <ListTitle titles={titles} />
        <List style={{height: height}} data={data} renderItem={renderItem} />
      </Layout>
    </>
  );
};
