import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Avatar,
  Button,
  Layout,
  Popover,
  Text,
  Modal,
} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

export const ModalOverlay = ({
  onBackdropPress,
  visible,
  children,
  text,
  placement,
  handleClose,
}) => {
  const {t, i18n} = useTranslation();
  return (
    <Modal
      backdropStyle={styles.backdrop}
      visible={visible}
      placement={placement}
      onBackdropPress={onBackdropPress}
      handleClose={handleClose}>
      <Layout style={styles.content}>
        <Layout>
          <Text category="h3">{text}</Text>
        </Layout>
        {children}
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 15,
    marginBottom: 175,
    padding: 15,
    height: 280,
    width: 360,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
});
