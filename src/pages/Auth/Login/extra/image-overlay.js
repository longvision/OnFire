import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Image,
} from 'react-native';

const DEFAULT_OVERLAY_COLOR = 'rgba(14, 73, 14, 0.450)';

export const ImageOverlay = (props) => {
  const {style, children, source, ...imageBackgroundProps} = props;
  const {overlayColor, ...imageBackgroundStyle} = StyleSheet.flatten(style);

  return (
    <ImageBackground
      {...imageBackgroundProps}
      source={source}
      style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR},
        ]}
      />
      {children}
    </ImageBackground>
  );
};
