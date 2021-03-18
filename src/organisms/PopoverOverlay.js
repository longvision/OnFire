import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Button, Layout, Popover, Text} from '@ui-kitten/components';

export const PopoverOverlay = ({
  handleClose,
  visible,
  children,
  renderToggleButton,
  placement,
}) => {
  return (
    <Popover
      backdropStyle={styles.backdrop}
      visible={visible}
      placement={placement}
      anchor={renderToggleButton}
      onBackdropPress={handleClose}>
      <Layout style={styles.content}>
        <Text category="h3">Add new Recipe</Text>
        {children}
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginTop: 10,
    height: 600,
    width: 360,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
});

{
  /* <PopoverOverlay
  renderToggleButton={renderToggleButton}
  visible={visible}
  placement="top"
  handleClose={() => setVisible(false)}>
  <Text>Testeeee</Text>
</PopoverOverlay>; */
}
