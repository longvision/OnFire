import React from 'react';
import {
  Button,
  List,
  Layout,
  Text,
  Divider,
  useTheme,
} from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ListTitle from '../atoms/ListTitle';

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

  width,
  ...props
}) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handlePressIngredientsDetails(item) {
    navigation.navigate('EditIngredient', { item });
  }

  const renderItem = ({ item, index }) => (
    <>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 64,
          width: '100%',
          marginTop: 1,
          paddingHorizontal: 5,
        }}>
        <Layout style={{ flex: 4, marginLeft: 10 }}>
          <Text category="s1">{item.name}</Text>
          <Text category="p1">{item.brand}</Text>
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
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              flex: 2,
              marginRight: 10,
            }}>
            <Button
              size={btnSize}
              onPress={() => handlePressIngredientsDetails(item)}
              status="basic"
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
      {/* <Layout style={containerStyle}> */}
      <ListTitle titles={titles} />

      <List
        style={{
          backgroundColor: 'white',
          backgroundColor: theme['color-basic-400'],
        }}
        data={data}
        contentContainerStyle={{
          paddingHorizontal: 13,

          paddingVertical: 4,
          paddingBottom: 120,
        }}
        renderItem={renderItem}
      />
      {/* </Layout> */}
    </>
  );
};
