import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from '@components';
const { width } = Dimensions.get('window');
const url =
  'https://static-00.iconduck.com/assets.00/react-javascript-js-framework-facebook-icon-2048x1822-f7kq7hho.png';
const CustomDrawer: React.FC<DrawerContentComponentProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: url }} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>Hello Dev.</Text>
    </SafeAreaView>
  );
};

export default CustomDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
  },
});
