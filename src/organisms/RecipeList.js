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
import {ImageCarousel} from '../molecules/ImageCarousel';

export const RecipeList = ({
  recipes,
  cta,
  rating = true,
  ratingTitle,
  navigation,
  img,
  containerStyle,
  handleCamera,
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

  const renderItemFooter = info => (
    <View
      style={{
        margin: 25,
        flexDirection: 'row',
      }}>
      <Text category="s1">{info.item.description}</Text>
    </View>
  );

  // const renderItemFooter = footerProps => (
  //   <View style={{height: 60, flexDirection: 'row', backgroundColor: 'white'}}>
  //     <Text {...footerProps}>Rating</Text>
  //     <Popularity title={ratingTitle} start={2.556} count={5} imageSize={15} />
  //   </View>
  // );
  const renderItemHeader = (headerProps, info) => (
    <View
      {...headerProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 44,
      }}>
      <Text status="basic" category="h4" style={{marginLeft: 15}}>
        {info.item.title}
      </Text>
      {info.item.files.length == 0 && (
        <Button status="info" onPress={handleCamera}>
          {t('Add_Image')}
        </Button>
      )}
    </View>
  );
  const renderItem = info => (
    <Card
      style={{marginVertical: 5, borderColor: 'blue'}}
      onPress={() => handlePress(info.item)}
      status="info"
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={() => renderItemFooter(info)} //will enable rating
    >
      {info.item.files.length > 0 ? (
        <ImageCarousel data={info.item.files} />
      ) : null}
    </Card>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
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
    </>
  );
};
