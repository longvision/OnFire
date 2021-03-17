import React from 'react';
import {Button, Icon, List, Layout, Text} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Popularity from '../atoms/Popularity';
import ListTitle from '../atoms/ListTitle';
import {useDispatch} from 'react-redux';

export const RecipeList = ({
  recipes,
  cta,
  rating,
  ratingTitle,
  navigation,
  img,
  containerStyle,
  titles,
  assessoryLeft,
  btnSize,
  height,
  width,
  ...props
}) => {
  const dispatch = useDispatch();
  function handlePress(item) {
    dispatch.recipes.setSelectedAsync(item);
    navigation.navigate('RecipeDetail');
  }

  const renderItem = ({item, index}) => (
    <Layout
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        marginTop: 2,
        padding: 7,
      }}>
      <Layout style={{width: 150}}>
        <Text style={{marginBottom: 10}} category="s1">
          {item.title}
        </Text>
        <Text style={{marginBottom: 10}} category="p2">
          {item.description}
        </Text>
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
            onPress={() => handlePress(item)}
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
      <Layout style={containerStyle}>
        <ListTitle titles={titles} />
        <List style={{height: height}} data={recipes} renderItem={renderItem} />
      </Layout>
    </>
  );
};
