import React from 'react';
import {Button, Icon, List, Layout, Text} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Popularity from '../atoms/Popularity';
import ListTitle from '../atoms/ListTitle';

export const IngredientList = ({
  data,
  cta,
  price,
  ratingTitle,
  handlePress,
  img,
  containerStyle,
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
        height: 54,
        marginTop: 2,
        padding: 5,
      }}>
      <Layout style={{flex: 4}}>
        <Text category="s1">{item.name}</Text>
        <Text category="p2">{item.brand}</Text>
      </Layout>
      {price && (
        <Layout
          style={{
            // alignSelf: 'flex-end',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: 150,
            flex: 2,
          }}>
          <Text category="s1">
            {`${Number(item.package_size).toFixed(2)} ${item.unit}`}
          </Text>
          <Text category="s2">{`$${Number(item.package_price).toFixed(
            2,
          )}`}</Text>
        </Layout>
      )}
      {cta && (
        <Layout
          style={{justifyContent: 'center', alignItems: 'flex-end', flex: 2}}>
          <Button
            size={btnSize}
            onPress={handlePress}
            // status="basic"
            appearance="outline"
            accessoryLeft={assessoryLeft}>
            {cta}
          </Button>
        </Layout>
      )}
    </Layout>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      <Layout style={containerStyle}>
        <ListTitle titles={titles} />
        <List style={{height: height}} data={data} renderItem={renderItem} />
      </Layout>
    </>
  );
};
