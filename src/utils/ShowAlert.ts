import {appInfo} from '@constants';
import {Alert} from 'react-native';

/* Show alert */
export const showAlert = (message: string, onClick?: () => void) => {
  Alert.alert(
    appInfo.name,
    message,
    [{text: 'OK', onPress: () => onClick && onClick()}],
    {
      cancelable: false,
    },
  );
};

export const showActionAlert = (message: string, action?: () => void) => {
  Alert.alert(
    appInfo.name,
    message,
    [
      {
        text: 'OK',
        onPress: () => {
          action && action();
        },
      },
    ],
    {
      cancelable: false,
    },
  );
};

export const showOptionAlert = (message: string, action?: () => void) => {
  Alert.alert(
    appInfo.name,
    message,
    [
      {
        text: 'OK',
        onPress: () => {
          action && action();
        },
      },
      {text: 'Cancel'},
    ],
    {cancelable: false},
  );
};
