import {
  Text,
  Layout,
  Button,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {ThemedAwesomeIcon} from '../atoms/ThemedAwesomeIcon';
import {useDispatch} from 'react-redux';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function Slide({data}) {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch.files.deleteAsync({name: data.name, product_id: data.product_id});
  }
  const DeleteIcon = props => (
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
            source={{uri: data.url}}
            resizeMode="cover"
            style={{width: windowWidth * 0.9, height: windowWidth * 0.7}}
          />
        </View>
      </Layout>
    </>
  );
}

export const ImageCarousel = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => `${item.product_id}-${item.url}`}
      // style={{}}
      contentContainerStyle={{
        width: 280,
        height: 280,
      }}
      renderItem={({item}) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      // horizontal
      // showsHorizontalScrollIndicator={true}
    />
  );
};

const themedStyles = StyleService.create({
  buttonImageIconStyle: {
    position: 'absolute',
    height: 54,
    width: 44,
    top: -16,
    right: -25,
    zIndex: 1,
    backgroundColor: 'color-primary-100',
    borderColor: 'color-primary-100',
  },
  icon: {
    color: 'color-primary-100',
  },
});
