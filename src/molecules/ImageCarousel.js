import {Text, Layout, Button, Icon} from '@ui-kitten/components';
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
const DeleteIcon = props => {
  return <ThemedAwesomeIcon name="trash-outline" {...props} />;
};
export function Slide({data}) {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch.files.deleteAsync({name: data.name, product_id: data.product_id});
  }
  return (
    <>
      <Button
        onPress={handleDelete}
        style={styles.buttonImageIconStyle}
        accessoryRight={DeleteIcon}
        status="control"
      />

      <View
        style={{
          height: 300,
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: data.url}}
          resizeMode="contain"
          style={{width: windowWidth * 0.8, height: windowHeight * 0.8}}
        />
      </View>
    </>
  );
}

export const ImageCarousel = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => `${item.product_id}-${item.url}`}
      style={{flex: 1}}
      contentContainerStyle={{marginLeft: 20}}
      renderItem={({item}) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      // horizontal
      // showsHorizontalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  buttonImageIconStyle: {
    position: 'absolute',
    height: 44,
    width: 44,
    top: 0,
    right: 8,
    zIndex: 1,
  },
});
