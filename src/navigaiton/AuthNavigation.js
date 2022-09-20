import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';

const AuthNavigaiton = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: '#fff',
      }}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen
        options={{
          headerShown: true,
        }}
        name="SignUp"
        component={SignUp}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigaiton;