import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import FeedStack from './FeedStack';
// import SearchStack from './SearchStack';
import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemedAwesomeIcon } from '../atoms/ThemedAwesomeIcon';
import KitchenStack from './kitchen.navigator';
import SettingsStack from './settings.navigator';

const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="KITCHEN"
      tabBarOptions={{
        activeTintColor: theme['color-basic-100'],
        inactiveTintColor: theme['color-basic-900'],
        labelStyle: { fontWeight: 'bold', fontSize: 14 },
        activeBackgroundColor: theme['color-basic-900'],
        inactiveBackgroundColor: theme['color-basic-200'],
      }}>
      <Tab.Screen
        name={t('KITCHEN')}
        component={KitchenStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size, ...props }) => (
            <ThemedAwesomeIcon
              // {...props}
              color={color}
              size={24}
              name="shaker-outline"
            />
          ),
        }}
      />
      <Tab.Screen
        name={t('SETTINGS')}
        component={SettingsStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size, ...props }) => (
            <ThemedAwesomeIcon
              // {...props}
              color={color}
              size={24}
              name="cog"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
