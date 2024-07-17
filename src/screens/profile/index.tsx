import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {styles} from './Styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  BLUE,
  Images,
  LocalStorageKeys,
  StoreConstantValues,
  Strings,
  WHITE,
  appInfo,
} from '@constants';
import {Image} from '@components';
import {commonApi} from '@api/CommonApi';
import {ACCOUNT, LOGOUT} from '@api/EndPoints';
import {deleteData, showOptionAlert} from '@utils';
import NavigationService from '@navigation/NavigationService';

type userDataType = {key: string; value: string | undefined};
const staticData = [
  {key: 'First Name', value: ''},
  {key: 'Last Name', value: ''},
  {key: 'Email', value: ''},
  {key: 'Phone', value: ''},
];

const Profile = () => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<userDataType[]>([]);
  useEffect(() => {
    callUserDataApi();
  }, []);

  /**
   * call get user API
   */
  const callUserDataApi = async () => {
    await commonApi({
      url: appInfo.mainDomain + ACCOUNT,
    }).then(res => {
      if (res?.status == 200 && res?.data?.success) {
        const newData = staticData.map(v => {
          return {
            ...v,
            value: returnProperData(res?.data?.data, v.key),
          };
        });
        setData([...newData]);
      }
    });
  };

  /**
   *
   * @param data
   * @param key
   * @returns userDataType[]
   * for manage user info
   */
  const returnProperData = (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    },
    key: string,
  ) => {
    switch (key) {
      case 'First Name':
        return data.firstName ?? '';
      case 'Last Name':
        return data.lastName ?? '';
      case 'Email':
        return data.email ?? '';
      case 'Phone':
        return data.phoneNumber ?? '';
    }
  };

  const onLogout = () => {
    showOptionAlert(Strings.areYouSure, () => {
      onLogoutApi();
    });
  };

  /**
   * For call logout api
   */
  const onLogoutApi = async () => {
    await commonApi({
      url: appInfo.mainDomain + LOGOUT,
    })
      .then(async res => {
        if (res?.status == 200 && res?.data?.success) {
          console.log('HELLO =====+<> ');
          await deleteData(LocalStorageKeys.USER_DATA);
          StoreConstantValues.USER_ACCESS_TOKEN = '';
          NavigationService.navigateToClearStack('Login');
        }
      })
      .catch(e => {
        console.log('e =====+<> ', JSON.stringify(e));
      });
  };
  /**
   *
   * @param param0
   * Render user info UI
   */
  const _renderItem = ({item}: {item: userDataType}) => {
    return (
      <View style={styles.renderContainer}>
        <Text style={styles.titleKey}>{item.key}</Text>
        <Text style={styles.titleValue}>{item?.value ?? ''}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={BLUE} />
      <View style={[styles.headerContainer, {paddingTop: insets.top}]}>
        <Text style={styles.headerTitle}>Home</Text>
        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Image
            source={Images.ic_logout}
            tintColor={WHITE}
            style={styles.logoutButtonImg}
          />
        </Pressable>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.logoContainer}>
          <Image source={Images.ic_demoCodeLogo} style={styles.logo} />
          <Text style={styles.title}>{Strings.title}</Text>
        </View>
        {data.length ? (
          <FlatList
            data={data}
            keyExtractor={(_, i) => i.toString()}
            renderItem={_renderItem}
            contentContainerStyle={styles.listContainContainer}
            style={styles.listStyle}
          />
        ) : (
          <View style={{marginTop: '15%'}}>
            <ActivityIndicator color={BLUE} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;
