import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  Button, Divider, Layout, TopNavigation,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../atoms/Loading';

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    border: 1,
    backgroundColor: 'lightYellow',
    padding: 16,
    width: 300,
    height: 400,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
};

export const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Loading examples
  // loading.global
  // loading.models.auth
  // loading.effects.auth.loginAsync
  const loading = useSelector((state) => state.loading);

  const handlePress = () => {
    dispatch.auth.signOutAsync();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Feed" alignment="center" />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Button onPress={navigateDetails}>OPEN DETAILS</Button> */}
        <Layout style={styles.container}>
          <Loading
            label="loading.global"
            show={loading.global > 0}
            status="primary"
            size="medium"
          />
          <Loading
            label="loading.models.auth"
            show={loading.models.auth > 0}
            status="primary"
            size="medium"
          />
          <Loading
            label="loading.effects.auth.loginAsync"
            show={loading.effects.auth.loginAsync > 0}
            status="primary"
            size="medium"
          />
        </Layout>
        <Button style={{ marginVertical: 4 }} onPress={handlePress}>
          Log out
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
