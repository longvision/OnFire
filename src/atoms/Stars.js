import React from 'react';

import { Rating } from 'react-native-ratings';

const Stars = ({
  start, count, size, ratingCompleted,
}) => (
    <Rating
      type="custom"
      ratingCount={count}
      imageSize={size}
      showRating={true}
      fractions={2}
      startingValue={start}
      ratingColor="green"
      readonly={true}
      ratingBackgroundColor="#c6c6c6"
      onFinishRating={ratingCompleted && ratingCompleted}
    />
);

export default Stars;
