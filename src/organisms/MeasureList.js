import React from 'react';
import {
  Button,
  Icon,
  List,
  Layout,
  ListItem,
  Text,
  Divider,
} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
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
      <ListItem
        title={`${item.ingredients.name} | ${item.ingredients.brand} `}
        description={`${t('quantity')}: ${Number(item.quantity).toFixed(2)}${
          item.unit
        } - ${t('cost')}: ${t('$')}${Number(item.cost).toFixed(2)}  `}
        accessoryRight={() =>
          cta && (
            <Layout style={{flexDirection: 'row'}} level="1">
              {rating && <Popularity start={2.556} count={5} size={17} />}
              <Button
                size="tiny"
                onPress={() => dispatch.measures.deleteAsync({id: item.id})}
                appearance="outline"
                accessoryLeft={img && renderItemIcon}>
                {cta}
              </Button>
            </Layout>
          )
        }
      />
      <Divider />
    </>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      <Layout style={{width: width, paddingBottom: 55}} level="1">
        <List
          style={{height: height, backgroundColor: 'white'}}
          data={measures}
          renderItem={renderItem}
        />
      </Layout>
    </>
  );
};
