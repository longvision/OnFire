import React from 'react';

import { Layout, Text } from '@ui-kitten/components';
import { Rating } from 'react-native-ratings';

const Popularity = ({
  title, start, show, titleCategory, count, imageSize,
}) => (
    <Layout
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      {title && <Text category={titleCategory}>{title}</Text>}
      {start && count && (
        <Text category={titleCategory}>{`${start} / ${count}`}</Text>
      )}
      <Rating
        startingValue={start}
        type="custom"
        ratingColor="red"
        ratingBackgroundColor="white"
        ratingCount={count}
        showRating={show}
        fractions={2}
        readonly={true}
        imageSize={imageSize}
        // onFinishRating={ratingCompleted}
        style={{ paddingVertical: 0, backgroundColor: 'transparent' }}
      />
    </Layout>
);

export default Popularity;
