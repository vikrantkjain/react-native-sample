import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn, Signup, Profile, Splash} from '@screens';
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={SignIn} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
};

export default MainStack;
