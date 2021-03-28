import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import FeedStack from './FeedStack';
// import SearchStack from './SearchStack';
import KitchenStack from './kitchen.navigator';
import SettingsStack from './settings.navigator';
import {Icon, useTheme} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
// const FeedIcon = (props) => <Icon {...props} name="home-outline" />;

// const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const MainNavigator = () => {
  const {t, i18n} = useTranslation();
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="KITCHEN"
      tabBarOptions={{
        // inactiveTintColor: Colors.inactive,
        activeTintColor: theme['color-primary-400'],
        labelStyle: {fontWeight: 'bold', fontSize: 14},
        // inactiveBackgroundColor: '#FF3351',
        // activeBackgroundColor: Colors.activebk,
      }}>
      <Tab.Screen
        name={t('KITCHEN')}
        component={KitchenStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused, color, size, ...props}) => (
            <MaterialCommunityIcons name="shaker" color={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={t('SETTINGS')}
        component={SettingsStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused, color, size, ...props}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
