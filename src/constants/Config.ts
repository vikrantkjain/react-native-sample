/**
 * All configuration example
 * google api key, agora api key etc.
 */

import {Platform} from 'react-native';
import RNConfig from 'react-native-config';

export const appInfo = {
  name: 'DemoCode',
  mainDomain: RNConfig.API_URL,
  url: Platform.select({
    android:
      'https://play.google.com/store/apps/details?id=com.netflix.mediaclient',
    ios: 'https://apps.apple.com/in/app/netflix/id363590051',
  }),
};
