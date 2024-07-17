import React from 'react';
import {FlatList, Modal, Pressable, StyleSheet, View} from 'react-native';
import {AddOptional, ModalPickerProps} from '@customTypes';
import {BLACK, WHITE} from '@constants';
import {Text, Image} from '@components';
import {FastImageProps} from 'react-native-fast-image';

const ModalPicker: React.FC<AddOptional<ModalPickerProps>> = ({
  isVisible,
  onClose,
  itemContainerStyle,
  onSelectItem,
  leftImage,
  selectedValue,
  data,
  dialogBoxStyle,
  title,
}) => {
  const _renderItem: React.FC<{
    item: {
      images?: FastImageProps['source'];
      name: string;
    };
    index: number;
  }> = ({item, index}) => {
    return (
      <Pressable
        style={[Style.itemContainerStyle, itemContainerStyle]}
        onPress={() => onSelectItem && onSelectItem(item, index)}>
        {leftImage ? (
          <Image
            source={item.images}
            style={[Style.imageStyle]}
            resizeMode={'contain'}
          />
        ) : null}
        <View style={[Style.textContainer]}>
          <Text style={[Style.itemTextStyle]}>{item.name}</Text>
        </View>
        {selectedValue === item.name ? (
          <Image
            source={require('../../assets/images/ic_check.png')}
            resizeMode={'contain'}
            style={Style.imageStyle}
          />
        ) : null}
      </Pressable>
    );
  };
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      style={Style.modalStyle}
      animationType={'fade'}
      onRequestClose={() => {
        onClose && onClose();
      }}>
      <Pressable
        style={Style.modalCloseButtonStyle}
        onPress={() => {
          onClose && onClose();
        }}>
        <View style={Style.container}>
          <View style={[Style.dialogBoxStyle, dialogBoxStyle]}>
            <View style={Style.titleViewStyle}>
              <Text style={Style.titleTextContainerStyle}>{title ?? ''}</Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data ?? []}
              renderItem={_renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(ModalPicker);
ModalPicker.defaultProps = {
  itemContainerStyle: {},
  dialogBoxStyle: {},
  leftImage: false,
  selectedValue: '',
  title: 'Choose Pic',
  data: [],
};

const Style = StyleSheet.create({
  titleViewStyle: {
    height: 55,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalCloseButtonStyle: {flex: 1},
  modalStyle: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
    flex: 1,
  },
  dialogBoxStyle: {
    backgroundColor: WHITE,
    maxHeight: 410,
    width: '50%',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  titleTextContainerStyle: {
    fontSize: 12,
    color: BLACK,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },
  itemTextStyle: {
    fontSize: 10,
    color: BLACK,
  },
  itemContainerStyle: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'red',
    alignItems: 'center',
  },
  imageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
