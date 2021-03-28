import React from 'react';
import {
  Button,
  Icon,
  List,
  Layout,
  Text,
  Divider,
  ListItem,
  Card,
} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Popularity from '../atoms/Popularity';
import ListTitle from '../atoms/ListTitle';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const RecipeList = ({
  recipes,
  cta,
  rating = true,
  ratingTitle,
  navigation,
  img,
  containerStyle,

  assessoryLeft,
  btnSize,
  height,
  width,
  ...props
}) => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  function handlePress(item) {
    dispatch.recipes.setSelectedAsync(item);
    dispatch.measures.getAsync({id: item.id});

    navigation.navigate('RecipeDetail');
  }

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="h4">{info.item.title}</Text>
    </View>
  );

  const renderItemFooter = footerProps => (
    <View style={{height: 60, flexDirection: 'row', backgroundColor: 'white'}}>
      <Text {...footerProps}>Rating</Text>
      <Popularity title={ratingTitle} start={2.556} count={5} imageSize={15} />
    </View>
  );
  const renderItem = info => (
    <Card
      style={{marginVertical: 2}}
      onPress={() => handlePress(info.item)}
      status="basic"
      header={headerProps => renderItemHeader(headerProps, info)}
      // footer={renderItemFooter} //will enable rating
    >
      <Text category="p2">{info.item.description}</Text>
    </Card>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      {/* <Layout style={containerStyle}> */}
      <List
        style={{marginVertical: 4, backgroundColor: 'white'}}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          paddingBottom: 120,
        }}
        data={recipes}
        renderItem={renderItem}
      />
      {/* </Layout> */}
    </>
  );
};
