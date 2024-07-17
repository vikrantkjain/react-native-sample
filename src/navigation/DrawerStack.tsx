/* eslint-disable react/no-unstable-nested-components */
import React, { memo } from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { BottomTabBar, CustomDrawer } from '@components';
// import CustomDrawer from '../components/Drawer'
const DrawerStack = () => {
  const Drawer = createDrawerNavigator();

  const CustomDrawerMenu = (props: DrawerContentComponentProps) => {
    return <CustomDrawer {...props} />;
  };
  return (
    <Drawer.Navigator
      initialRouteName="BottomStack"
      drawerContent={CustomDrawerMenu}
      screenOptions={{
        headerShadowVisible: false,
        /**
         * @forCustomization
         */
        // drawerPosition: 'right',
        // drawerStyle: {
        //   width: '85%',
        // },
      }}>
      <Drawer.Screen
        options={{ headerShown: false }}
        name="BottomStack"
        component={BottomTabBar}
      />
    </Drawer.Navigator>
  );
};

export default memo(DrawerStack);
