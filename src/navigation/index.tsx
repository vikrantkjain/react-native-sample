import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStack from '@navigation/MainStack';
import NavigationService from '@navigation/NavigationService';

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        if (navigatorRef) {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }
      }}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Routes;
