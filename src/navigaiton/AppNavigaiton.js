import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomNavigator from './BottomNavigaiton';

const AppNavigaiton = () => {
  const Spotify = createNativeStackNavigator();

  return (
    <Spotify.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Spotify.Screen name="BottomNavigator" component={BottomNavigator} />
      
    </Spotify.Navigator>
  );
};

export default AppNavigaiton;