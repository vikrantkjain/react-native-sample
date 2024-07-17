import {Alert, Linking} from 'react-native';
import {AppConstants, Strings, LocalStorageKeys, appInfo} from '@constants';
import {showAlert, getData, printConsole, resetLocalData} from '@utils';
import NavigationService from '@navigation/NavigationService';

export const showErrorDialog = (newPropsParam: {[key: string]: any}) => {
  if (AppConstants.DEV) {
    printConsole('SHOW ERROR DIALOG:- ' + JSON.stringify(newPropsParam));
  }

  if (newPropsParam) {
    let newProps = newPropsParam;
    switch (newProps.status) {
      case 400:
        if (newProps?.data?.errors) {
          showAlert(newProps?.data?.errors.message);
        } else if (newProps?.data?.error) {
          showAlert(newProps?.data?.error?.message ?? newProps?.data?.message);
        } else if (newProps?.data?.message) {
          showAlert(newProps?.data?.message);
        }
        break;

      case 401:
        Alert.alert(
          appInfo.name,
          newProps?.data?.error?.message ?? newProps?.data?.message,
          [{text: Strings.ok, onPress: () => tokenExpire()}],
          {cancelable: false},
        );
        break;

      case 404:
        showAlert(Strings.noData);
        break;

      case 405:
        showAlert(Strings.noData);
        break;

      case 422:
        if (newProps?.data?.error && newProps?.data?.error?.message) {
          showAlert(newProps?.data?.error?.message);
        } else if (newProps?.data?.message) {
          showAlert(newProps?.data?.message);
        }
        break;

      case 426:
        Alert.alert(
          Strings.appUpdateTitle,
          Strings.appUpdateDesc,
          [
            {
              text: Strings.updateLater,
              onPress: onUpdateLater,
              style: 'cancel',
            },
            {
              text: Strings.updateNow,
              onPress: onUpdate,
              style: 'default',
            },
          ],
          {
            cancelable: false,
            onDismiss: onUpdateLater,
          },
        );
        break;

      case 500:
        showAlert(Strings.internalServer);
        break;

      case 502:
        showAlert(Strings.pleaseTryAgain);
        break;

      case 0:
        showAlert(Strings.networkError);
        break;

      case 999:
        showAlert(Strings.noInternet);
        break;

      default:
        showAlert(Strings.somethingPleaseTryAgain);
        break;
    }
  } else {
    showAlert(Strings.pleaseTryAgain);
  }
};

const tokenExpire = async () => {
  getData(LocalStorageKeys.USER_DATA).then((value: string | undefined) => {
    if (value) {
      resetLocalData();
      NavigationService.navigateToClearStack('SignIn');
    }
  });
};

const onUpdate = () => {
  if (appInfo.url) {
    Linking.openURL(appInfo.url).catch(err =>
      printConsole(
        err,
        'An error occurred while trying to link to the app store',
      ),
    );
  }
};

const onUpdateLater = () => {};
