import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList as List,
  Pressable,
} from 'react-native';
import {Images, Strings} from '@constants';
import {Image} from '@components';
import CountryJSON from './Countries.json';
import styles from './Style';
import {
  AddOptional,
  CountryComponentItem,
  CountryItemsProps,
  CountryPickerProps,
} from '@customTypes';
import {Source} from 'react-native-fast-image';

const emptyList = () => {
  return (
    <View style={styles.emptyList}>
      <Text style={styles.noData}>{Strings.noDataFound}</Text>
    </View>
  );
};

type SelectDefaultType = {
  defaultText: string;
  dropDownImage_: number | Source | undefined;
  withFlag_: boolean;
  hideCountryCode_: boolean;
};

const Item: React.FC<CountryComponentItem> = ({
  item,
  phoneCode,
  countryName,
  flag,
  withFlag,
  ListItemOnPress,
  listItemStyle,
  listTextStyle,
}) => {
  return (
    <View style={[listItemStyle]}>
      <Pressable onPress={() => ListItemOnPress(item)}>
        <View style={styles.listViewRowContainer}>
          {withFlag && (
            <Image source={{uri: flag}} style={styles.countryFlagContainer} />
          )}
          <Text
            style={[
              withFlag && {paddingLeft: 8},
              listTextStyle,
            ]}>{`+${phoneCode} (${countryName})`}</Text>
        </View>
        <View
          style={withFlag ? styles.showCountryStyle : styles.hideCountryStyle}
        />
      </Pressable>
    </View>
  );
};

const CountryPicker: React.FC<AddOptional<CountryPickerProps>> = ({
  withFlag = true,
  style,
  disabled,
  hideCountryCode,
  selectedCountryTextStyle,
  showCountryName,
  dropDownImage,
  selectedValue,
  containerStyle,
  placeholder,
  countryCode,
  headerStyle,
  listStyle,
  listItemStyle,
  backImageStyle,
  backImage,
  inputStyle,
  listTextStyle,
  inputProps,
  animationType,
}) => {
  const [state, setState] = useState({
    searchText: '',
    selectedCountryFlag: '',
    hidePickerTitle: false,
    selectedCountryName: '',
    hideSearchBar: true,
    arrayData: CountryJSON,
    modalVisible: false,
    selectedFlag: false,
    selectedCountryCode: '',
  });
  const [visible, setVisible] = useState<boolean>(false);

  const searchFilterFunction = (searchText: string) => {
    if (searchText.match(/^\d/)) {
      const newData = CountryJSON.filter(item =>
        item.phone_code.toString().startsWith(searchText),
      );
      setState(previousState => ({
        ...previousState,
        arrayData: [...newData],
      }));
    } else {
      //search with text.
      const newData = CountryJSON.filter(item =>
        item.country_name.toUpperCase().startsWith(searchText.toUpperCase()),
      );
      setState(previousState => ({
        ...previousState,
        arrayData: [...newData],
      }));
    }
  };

  const ListItemOnPress = (item: CountryItemsProps) => {
    hideModal();
    selectedValue && selectedValue(item.phone_code, item.id);
    setState(previousState => ({
      ...previousState,
      selectedFlag: true,
      selectedCountryCode: item.phone_code,
      selectedCountryFlag: item.flag,
      selectedCountryName: item.country_name,
      arrayData: CountryJSON,
    }));
  };

  const selectDefaultCountry = ({
    defaultText,
    dropDownImage_,
    withFlag_,
    hideCountryCode_,
  }: SelectDefaultType) => {
    const newData = CountryJSON.filter(
      item => item.phone_code.toString() === defaultText,
    );
    return (
      <View style={styles.selectDefaultCountryContainerStyle}>
        {!withFlag_ && newData[0] && (
          <Image
            source={{uri: newData[0].flag}}
            style={styles.countryFlagContainer}
          />
        )}
        {!hideCountryCode_ && (
          <Text style={selectedCountryTextStyle}>{defaultText}</Text>
        )}
        <Image source={dropDownImage_} style={styles.dropDownImageStyle} />
      </View>
    );
  };

  const renderItem: React.FC<{
    item: CountryItemsProps;
  }> = ({item}) => {
    const {phone_code, country_name, flag} = item;
    return (
      <Item
        item={item}
        flag={flag}
        withFlag={withFlag}
        phoneCode={phone_code}
        countryName={country_name}
        ListItemOnPress={ListItemOnPress}
        listItemStyle={listItemStyle}
        listTextStyle={listTextStyle}
      />
    );
  };

  const showModal = () => setVisible(true);

  const hideModal = () => {
    setVisible(false);
    setState(perviousState => ({
      ...perviousState,
      arrayData: CountryJSON,
    }));
  };

  return (
    <View style={style}>
      {state.selectedFlag ? (
        <Pressable
          style={containerStyle}
          disabled={disabled}
          onPress={showModal}>
          <View style={styles.selectedCountryContainer}>
            {withFlag && (
              <Image
                source={{uri: state.selectedCountryFlag}}
                style={styles.countryFlagContainer}
              />
            )}
            {hideCountryCode ? null : (
              <Text style={selectedCountryTextStyle}>
                {showCountryName
                  ? state.selectedCountryName
                  : '+' + state.selectedCountryCode}
              </Text>
            )}
            {dropDownImage && (
              <Image
                resizeMode="contain"
                source={dropDownImage}
                style={styles.dropDownImageStyle}
              />
            )}
          </View>
        </Pressable>
      ) : (
        <Pressable
          disabled={disabled}
          onPress={showModal}
          style={styles.openCountryDropDownStyle}>
          {selectDefaultCountry({
            defaultText: countryCode ?? '+91',
            dropDownImage_: dropDownImage ?? Images.ic_drop_down,
            withFlag_: withFlag ?? false,
            hideCountryCode_: hideCountryCode ?? false,
          })}
        </Pressable>
      )}
      <Modal
        animationType={animationType}
        visible={visible}
        onRequestClose={hideModal}>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <View style={[styles.header, headerStyle]}>
            <Pressable
              hitSlop={styles.hitSlop}
              disabled={disabled}
              onPress={hideModal}>
              {backImage && (
                <Image
                  style={[styles.backImage, backImageStyle]}
                  resizeMode="contain"
                  source={backImage}
                />
              )}
            </Pressable>
            <TextInput
              style={[styles.searchBarStyle, inputStyle]}
              underlineColorAndroid="transparent"
              onChangeText={searchFilterFunction}
              placeholder={placeholder}
              placeholderTextColor={'#E0E2DE'}
              keyboardType="default"
              returnKeyType={'done'}
              blurOnSubmit={true}
              {...inputProps}
            />
          </View>
          <List
            overScrollMode="never"
            style={[styles.flatListStyle, listStyle]}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            initialNumToRender={22}
            data={state.arrayData}
            keyExtractor={item => `county_${item.id}`}
            renderItem={renderItem}
            ListEmptyComponent={emptyList}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default React.memo(CountryPicker);

CountryPicker.defaultProps = {
  disabled: false,
  withFlag: false,
  hideCountryCode: false,
  dropDownImage: Images.ic_drop_down,
  backImage: Images.ic_back_black,
  style: styles.containerStyle,
  inputStyle: styles.searchBarStyle,
  countryNameTextStyle: styles.countryNameTextStyle,
  selectedCountryTextStyle: styles.selectedCountryTextStyle,
  countryCode: '+1',
  placeholder: 'Search Country',
};
