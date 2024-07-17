import Reactotron from 'reactotron-react-native';
import {name as appName} from './app.json';

Reactotron.setAsyncStorageHandler()
  .configure({
    name: appName,
  })
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();

/**
 * Use to below code for AsyncStorage log and others log
 */

// Reactotron.setAsyncStorageHandler(AsyncStorage)
//   .configure({
//     name: 'React Native Demo', // your project name
//   })
//   .useReactNative({
//     asyncStorage: true, // there are more options to the async storage.
//     networking: {
//       // optionally, you can turn it off with false.
//       ignoreUrls: /symbolicate/,
//     },
//     editor: false, // there are more options to editor
//     errors: {veto: stackFrame => false}, // or turn it off with false
//     overlay: false, // just turning off overlay
//   })
//   .connect();
