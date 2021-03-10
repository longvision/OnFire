import React from 'react';

import {Layout, Text} from '@ui-kitten/components';
import {Rating} from 'react-native-ratings';

const Popularity = ({title, start, show, titleCategory, count, imageSize}) => {
  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  return (
    <Layout
      style={
        {
          // display: 'flex',
          // marginHorizontal: 5,
          // alignItems: 'center',
          // justifyContent: 'center',
        }
      }>
      {title && <Text category={titleCategory}>{title}</Text>}
      {start && count && (
        <Text category={titleCategory}>{`${start} / ${count}`}</Text>
      )}
      <Rating
        startingValue={start}
        type="custom"
        ratingColor="red"
        ratingBackgroundColor="#c4c4c4"
        ratingCount={count}
        showRating={show}
        fractions={2}
        readonly={true}
        imageSize={imageSize}
        onFinishRating={ratingCompleted}
        style={{paddingVertical: 0}}
      />
    </Layout>
  );
};

export default Popularity;
