import React from 'react';
import {
  Button,
  List,
  Layout,
  Text,
  Divider,
  Card,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemedAwesomeIcon } from '../atoms/ThemedAwesomeIcon';
import { Slide } from '../molecules/ImageCarousel';
import Loading from '../atoms/Loading';

const RecipeList = ({
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
  const page = useSelector((state) => state.recipes.page);
  const loadingMore = useSelector(
    (state) => state.loading.effects.recipes.loadMoreAsync,
  );

  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t, i18n } = useTranslation();

  function handlePress(item) {
    dispatch.recipes.setSelectedAsync(item);
    dispatch.measures.getAsync({ id: item.id });

    navigation.navigate('RecipeDetail');
  }

  function handleOnEndReached() {
    dispatch.recipes.loadMoreAsync({ nextPage: page + 1 });
  }

  const AddIcon = (props) => (
    <ThemedAwesomeIcon name="camera" {...props} color={styles.icon} />
  );
  const renderItemFooter = (info) => (
    <Layout
      level="1"
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'column',
      }}>
      <Divider />
      <Text category="p1" style={{ margin: 10 }}>
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
        height: 75,
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
        <Text status="basic" category="h3" style={{ margin: 15 }}>
          {info.item.title}
        </Text>
      </View>
    </Layout>
  );
  const renderItem = (info) => (
    <>
      <Card
        style={styles.card}
        onPress={() => handlePress(info.item)}
        header={(headerProps) => renderItemHeader(headerProps, info)}
        footer={() => renderItemFooter(info)} // will enable rating
      >
        {info.item.files && info.item.files.length > 0 && (
          <Slide data={info.item.files[0]} />
        )}
      </Card>
      {(!info.item.files || info.item.files.length === 0) && (
        <Button
          onPress={() => handleCamera(info.item.id)}
          style={styles.buttonImageIconStyle}
          accessoryRight={AddIcon}
        />
      )}
    </>
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      {loadingMore && (
        <Loading
          label="loading..."
          show={loadingMore}
          status="info"
          size="small"
        />
      )}
      <List
        style={{
          marginVertical: 4,
          // paddingBottom: 50,
          backgroundColor: theme['color-basic-400'],
        }}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 150,
        }}
        onEndReachedThreshold={0.5}
        onEndReached={handleOnEndReached}
        onScrollBeginDrag={() => {
          dispatch.recipes.fetchMore(true);
        }}
        data={recipes}
        renderItem={renderItem}
      />
    </>
  );
};

export default RecipeList;

const themedStyles = StyleService.create({
  card: {
    marginVertical: 3,
    // marginHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'color-basic-200',
    borderColor: 'color-basic-100',
    borderWidth: 2,
  },
  delete: {
    backgroundColor: 'color-basic-200',
  },
  buttonImageIconStyle: {
    position: 'absolute',
    height: 54,
    width: 54,
    top: 12,
    right: 2,
    zIndex: 2,
    backgroundColor: 'color-basic-200',
    borderColor: 'color-basic-200',
  },
});
