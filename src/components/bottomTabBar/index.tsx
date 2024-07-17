import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import Images from '@constants/Images';
import {TabBarIconsTypes} from '@customTypes';
import {Image, TopTabBar, Text} from '@components';
const Tab = createBottomTabNavigator();

const Search = () => {
  return (
    <View style={styles.textContainerStyle}>
      <Text>Search! </Text>
    </View>
  );
};
const History = () => {
  return (
    <View style={styles.textContainerStyle}>
      <Text>{`History!`}</Text>
    </View>
  );
};

const TabBarIcons: React.FC<TabBarIconsTypes> = ({route, focused}) => {
  let iconName, setColor;
  if (route.name === 'Home') {
    iconName = Images.ic_home;
    setColor = focused ? 'blue' : 'grey';
  } else if (route.name === 'Search') {
    iconName = Images.ic_search;
    setColor = focused ? 'blue' : 'grey';
  } else if (route.name === 'History') {
    iconName = Images.ic_history;
    setColor = focused ? 'blue' : 'grey';
  }
  return (
    <Image tintColor={setColor} style={styles.iconStyle} source={iconName} />
  );
};

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          return <TabBarIcons focused={focused} route={route} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff',
      })}>
      <Tab.Screen name="Home" component={TopTabBar} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

export default React.memo(BottomTabBar);

const styles = StyleSheet.create({
  textContainerStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  iconStyle: {width: 25, height: 25},
});
