import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import NoInternet from '@components/noInternet';
import NetworkProvider from '@contexts/NetworkProvider';
import {UserProvider} from '@contexts/UserContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Route from '@navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <UserProvider>
        <NetworkProvider>
          <SafeAreaProvider style={styles.container}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <Route />
            <NoInternet />
          </SafeAreaProvider>
        </NetworkProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
