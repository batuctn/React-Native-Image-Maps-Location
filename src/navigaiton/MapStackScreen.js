import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';

import Map from '../screens/Map/Map';
import MapImage from '../screens/MapImage/MapImage';


const Stack = createNativeStackNavigator();
const MapStackScreen = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'light' ? null : '#363636',
        },
        headerTitleStyle: {
          color: theme === 'light' ? 'black' : '#fff',
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Map"
        component={Map}
      />
      <Stack.Screen
        options={{
          headerShadowVisible: false,
        }}
        name="MapImage"
        component={MapImage}
      />
    </Stack.Navigator>
  );
};

export default MapStackScreen;