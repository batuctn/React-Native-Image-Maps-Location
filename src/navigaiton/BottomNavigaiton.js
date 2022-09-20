import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';

import HomeScreen from '../screens/Home/HomeScreen';
import MapStackScreen from '../navigaiton/MapStackScreen';
import ProfileStackScreen from './ProfileStackScreen';


const BottomTabs = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <BottomTabs.Navigator initialRouteName="Home" barStyle={{ backgroundColor: 'black' }}>
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShadowVisible: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={`home${focused ? '' : '-outline'}`}
              size={27}
              color="yellow"
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MapStackScreen"
        component={MapStackScreen}
        options={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShadowVisible: false,
          tabBarLabel: 'Map',
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name={`map-marker${focused ? '' : '-outline'}`}
              size={27}
              color="yellow"
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShown: false,
          headerShadowVisible: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name={`account-circle${focused ? '' : '-outline'}`}
              
              size={27}
              color="yellow"
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomNavigator;