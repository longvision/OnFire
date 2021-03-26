import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Button, Layout, Popover, Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

export const PopoverOverlay = ({
  handleClose,
  visible,
  children,
  anchor,
  placement,
}) => {
  const {t, i18n} = useTranslation();
  return (
    <Popover
      backdropStyle={styles.backdrop}
      visible={visible}
      placement={placement}
      anchor={anchor}
      onBackdropPress={handleClose}>
      <Layout style={styles.content}>
        <Text category="h3">{t('Create_Recipes')}</Text>
        {children}
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 15,
    marginBottom: 15,
    height: 280,
    width: 360,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: 600,
  },
});
