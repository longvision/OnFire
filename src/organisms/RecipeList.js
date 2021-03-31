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
import {ImageCarousel, Slide} from '../molecules/ImageCarousel';

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
    <Layout
      level="4"
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'column',
      }}>
      <Divider />
      <Text category="p1" style={{margin: 10}}>
        {info.item.description}
      </Text>
    </Layout>
  );

  // const renderItemFooter = footerProps => (
  //   <View style={{height: 60, flexDirection: 'row', backgroundColor: 'white'}}>
  //     <Text {...footerProps}>Rating</Text>
  //     <Popularity title={ratingTitle} start={2.556} count={5} imageSize={15} />
  //   </View>
  // );
  const renderItemHeader = (headerProps, info) => (
    <Layout
      {...headerProps}
      level="2"
      style={{
        display: 'flex',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // height: 44,
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text status="basic" category="h3" style={{margin: 15}}>
          {info.item.title}
        </Text>
      </View>
    </Layout>
  );
  const renderItem = info => (
    <Card
      style={{marginVertical: 10, alignItems: 'center', borderColor: 'grey'}}
      onPress={() => handlePress(info.item)}
      status="info"
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={() => renderItemFooter(info)} //will enable rating
    >
      {info.item.files && info.item.files.length > 0 ? (
        <Slide data={info.item.files[0]} />
      ) : (
        <Layout style={{marginVertical: 5}}>
          <Button
            status="info"
            appearance="outline"
            onPress={() => handleCamera(info.item.id)}>
            {t('Add_Image')}
          </Button>
        </Layout>
      )}
    </Card>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      <List
        style={{marginVertical: 4, backgroundColor: 'white'}}
        contentContainerStyle={{
          paddingHorizontal: 8,
          // paddingVertical: 4,
          // paddingBottom: 120,
        }}
        data={recipes}
        renderItem={renderItem}
      />
    </>
  );
};
