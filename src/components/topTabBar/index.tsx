import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '@components';
import {Example1, Example2} from '@screens';
import {Images} from '@constants';
import NavigationService from '@navigation/NavigationService';
const Tab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  return (
    <View style={{flex: 1}}>
      <Header
        type={'home'}
        title={'Header'}
        leftImage={Images.ic_drawer}
        titleStyle={styles.headerTitleStyle}
        style={styles.headerStyle}
        onPressLeft={() => {
          NavigationService.openDrawer();
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, textTransform: 'none'},
        }}>
        <Tab.Screen
          name="Example1"
          component={Example1}
          options={{tabBarLabel: 'Example1'}}
        />
        <Tab.Screen
          name="Settings"
          component={Example2}
          options={{tabBarLabel: 'Example2'}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default React.memo(TopTabBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleStyle: {
    textAlign: 'center',
  },
  headerStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
});
