import {
  Layout,
  Button,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import { ThemedAwesomeIcon } from '../atoms/ThemedAwesomeIcon';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export function Slide({ data }) {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch.files.deleteAsync({ name: data.name, product_id: data.product_id });
  }
  const DeleteIcon = (props) => (
    <ThemedAwesomeIcon name="delete-forever" {...props} color={styles.icon} />
  );
  return (
    <>
      <Layout level="1">
        <Button
          onPress={handleDelete}
          style={styles.buttonImageIconStyle}
          accessoryRight={DeleteIcon}
        />

        <View
          style={{
            maxHeight: 300,
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: data.url }}
            // resizeMode="cover"
            style={{
              width: windowWidth * 0.9,
              height: windowWidth * 0.7,
              resizeMode: 'cover',
              borderRadius: 7,
            }}
          />
        </View>
      </Layout>
    </>
  );
}

export const ImageCarousel = ({ data }) => (
    <FlatList
      data={data}
      keyExtractor={(item) => `${item.product_id}-${item.url}`}
      // style={{}}
      contentContainerStyle={{
        width: 280,
        height: 280,
      }}
      renderItem={({ item }) => <Slide data={item} />}
      pagingEnabled
      // horizontal
      // showsHorizontalScrollIndicator={true}
    />
);

const themedStyles = StyleService.create({
  buttonImageIconStyle: {
    position: 'absolute',
    height: 54,
    width: 44,
    top: -16,
    right: -25,
    zIndex: 1,
    backgroundColor: 'color-basic-200',
    borderColor: 'color-basic-200',
  },
  icon: {
    color: 'color-basic-200',
  },
});
