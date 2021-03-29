import {Text, Layout} from '@ui-kitten/components';
import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Dimensions, Image, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

function Slide({data}) {
  return (
    <View
      style={{
        height: 200,
        width: windowWidth - 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: data.url}}
        resizeMode="contain"
        style={{width: windowWidth * 0.9, height: windowHeight * 0.9}}></Image>
    </View>
  );
}

export const ImageCarousel = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => `${item.product_id}-${item.url}`}
      style={{flex: 1}}
      renderItem={({item}) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={true}
    />
  );
};
