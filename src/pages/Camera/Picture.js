import React, {useState} from 'react';
import {SafeAreaView, TouchableHighlight, Image, View} from 'react-native';
import {useParams} from '@react-navigation/native';
import Camera from './CameraClass';
import {Button} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
export const Picture = ({route, navigation}) => {
  const dispatch = useDispatch();
  const uri = route.params.uri;
  const product_id = route.params.product_id;
  const [img, setImg] = useState(uri);

  const backToCamera = () => {
    navigation.navigate('Camera');
    setImg(null);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Button status="danger" onPress={() => backToCamera()}>
          Take other
        </Button>
        <Image source={{uri: img}} resizeMode="contain" style={{flex: 1}} />
      </View>
      <Button
        status="success"
        onPress={() => {
          dispatch.files.addAsync({
            folder: 'recipes',
            productId: product_id,
            uri: uri,
          });
          navigation.navigate('MyKitchen');
        }}>
        Use this photo
      </Button>
    </SafeAreaView>
  );
};
