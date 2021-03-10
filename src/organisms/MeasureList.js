import React from 'react';
import {
  Button,
  Icon,
  List,
  Layout,
  ListItem,
  Text,
} from '@ui-kitten/components';

import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Popularity from '../atoms/Popularity';

export const MeasureList = ({
  data,
  cta,
  rating,
  handlePress,
  img,
  height,
  width,
  ...props
}) => {
  const renderItemAccessory = () => {
    return (
      <Layout style={{flexDirection: 'row'}}>
        {rating && <Popularity start={2.556} count={5} size={17} />}
        <Button size="tiny" onPress={handlePress} appearance="outline">
          {cta}
        </Button>
      </Layout>
    );
  };

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} | ${item.description} `}
      description={`custo: ${item.cost}`}
      accessoryLeft={img && renderItemIcon}
      accessoryRight={cta && renderItemAccessory}
    />
  );

  return (
    <>
      <Text>{props.label && props.label}</Text>
      <Layout style={{width: width}}>
        <List style={{height: height}} data={data} renderItem={renderItem} />
      </Layout>
    </>
  );
};
