import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import FeedStack from './FeedStack';
// import SearchStack from './SearchStack';
import KitchenStack from './kitchen.navigator';
import SettingsStack from './settings.navigator';
import {Icon} from '@ui-kitten/components';

const Tab = createBottomTabNavigator();
// const FeedIcon = (props) => <Icon {...props} name="home-outline" />;

const PostIcon = (props) => <Icon {...props} name="plus-circle-outline" />;

// const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // activeTintColor: Colors.active,
        // inactiveTintColor: Colors.inactive,
        activeTintColor: '#5F9D11',
        labelStyle: {fontWeight: 'bold'},
        // inactiveBackgroundColor: Colors.inactivebk,
        // activeBackgroundColor: Colors.activebk,
      }}>
      {/* <Tab.Screen
        name="Social"
        component={FeedStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="file-text"
              size={size ? size : 26}
              color={focused ? Colors.active : color}
              focused={focused}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="KITCHEN"
        component={KitchenStack}
        options={{
          unmountOnBlur: false,
          tabBarIcon: ({focused, color, size, ...props}) => (
            <Icon name="search-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SETTINGS"
        component={SettingsStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused, color, size, ...props}) => (
            <Icon {...props} name="plus-circle-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
