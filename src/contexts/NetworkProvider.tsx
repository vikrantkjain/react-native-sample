import React, {useMemo, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {AppConstants} from '@constants';

export const NetworkContext = React.createContext<{isConnected: boolean}>({
  isConnected: true,
});

const NetworkProvider = NetworkContext.Provider;

export const NetWork: React.FC<{children: JSX.Element}> = ({children}) => {
  const [networkState, setNetworkState] = useState<boolean>(true);
  const netInfo = useNetInfo();
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     const {isConnected, type} = state;
  //     setNetworkState(isConnected ?? false);
  //     AppConstants.NETWORK_CHECK = isConnected ?? false;
  //     console.log('IS_CONNECTED : ', isConnected, 'TYPE : ', type);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  useMemo(() => {
    if (typeof netInfo.isConnected == 'boolean') {
      setNetworkState(netInfo.isConnected ?? false);
      AppConstants.NETWORK_CHECK = netInfo.isConnected ?? false;
      console.log('IS_CONNECTED 1: ', netInfo.isConnected);
    }
  }, [netInfo.isConnected]);

  return (
    <NetworkProvider value={{isConnected: networkState}}>
      {children}
    </NetworkProvider>
  );
};

export default NetWork;
