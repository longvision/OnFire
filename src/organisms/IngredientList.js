import React, {useEffect} from 'react';
import {Button, Icon, List, Layout, Text, Divider} from '@ui-kitten/components';

import {StyleSheet, View, ScrollView} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Popularity from '../atoms/Popularity';
import ListTitle from '../atoms/ListTitle';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const IngredientList = ({
  data,
  cta,
  price,
  ratingTitle,

  img,
  containerStyle,
  titles,
  assessoryLeft,
  btnSize,
  height,
  width,
  ...props
}) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handlePressIngredientsDetails(item) {
    navigation.navigate('IngredientDetail', {item});
  }

  const renderItem = ({item, index}) => (
    <>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 54,
          marginTop: 2,
          marginHorizontal: 5,
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
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: 150,
              flex: 2,
            }}>
            <Text category="s1">
              {`${Number(item.package_size).toFixed(2)} ${item.unit}`}
            </Text>
            <Text category="s2">{`${t('$')}${Number(item.package_price).toFixed(
              2,
            )}`}</Text>
          </Layout>
        )}
        {cta && (
          <Layout
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 2}}>
            <Button
              size={btnSize}
              onPress={() => handlePressIngredientsDetails(item)}
              // status="basic"
              appearance="outline"
              accessoryLeft={assessoryLeft}>
              {cta}
            </Button>
          </Layout>
        )}
      </Layout>
      <Divider />
    </>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      <Layout style={containerStyle}>
        <ListTitle titles={titles} />

        <List
          style={{height: height, backgroundColor: 'white'}}
          data={data}
          renderItem={renderItem}
        />
      </Layout>
    </>
  );
};
