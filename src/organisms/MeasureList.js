import React from 'react';
import {
  Button,
  Icon,
  List,
  Layout,
  ListItem,
  Text,
  Divider,
  Card,
} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import Popularity from '../atoms/Popularity';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const MeasureList = ({
  data,
  cta,
  rating,
  img,
  height,
  width,
  ...props
}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const measures = useSelector(state => state.measures.measures);
  const renderItemIcon = props => <Icon {...props} name="trash-outline" />;

  const renderItem = ({item, index}) => (
    <>
      <Layout
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingVertical: 5,
        }}>
        <Layout style={{width: '80%'}}>
          <Text
            status="primary"
            category="s1">{`${item.ingredients.name} | ${item.ingredients.brand} `}</Text>
          <Text category="p2">
            {`${t('quantity')}: ${Number(item.quantity).toFixed(2)}${
              item.unit
            }`}
          </Text>
          <Text category="p2">
            {`${t('cost')}: ${t('$')}${Number(item.cost).toFixed(2)}  `}
          </Text>
        </Layout>

        <Button
          size="medium"
          style={{width: 60, height: 60, marginLeft: 3}}
          onPress={() => dispatch.measures.deleteAsync({id: item.id})}
          appearance="outline"
          accessoryLeft={img && renderItemIcon}>
          {cta}
        </Button>
      </Layout>
      <Divider />
    </>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      {/* <Layout style={{width: width, paddingBottom: 55}} level="1"> */}
      <List
        style={{height: height, backgroundColor: 'white'}}
        data={measures}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          paddingBottom: 120,
        }}
      />
      {/* </Layout> */}
    </>
  );
};
