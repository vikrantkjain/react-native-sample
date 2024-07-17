import {useEffect} from 'react';
import {BackHandler} from 'react-native';

/* Handle back press of screen to do anything  */
const useBackButton = (handler: () => boolean | null | undefined) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
};
export default useBackButton;
