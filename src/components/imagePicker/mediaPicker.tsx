import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  ForwardedRef,
} from 'react';
import {MediaPickerCompProps, MediaPickerProps} from '@customTypes';
import ImagePicker, {
  Options,
  Image,
  Video,
} from 'react-native-image-crop-picker';
import ModalPicker from './ModalPicker';
import {View} from 'react-native';

const data = [{name: 'Gallery'}, {name: 'Camera'}, {name: 'Cancel'}];

const MediaPicker = forwardRef(
  (props: MediaPickerCompProps, ref: ForwardedRef<MediaPickerProps> | null) => {
    const {children, onSelectItem, style} = props;
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    async function picker<T>({...params}: Options): Promise<Awaited<T>> {
      return await ImagePicker.openPicker({...params})
        .then(images => {
          return images;
        })
        .catch(e => {
          return e?.code;
        });
    }

    useImperativeHandle(ref, () => ({
      singlePhoto: async () => {
        return await picker<Image | string>({
          mediaType: 'photo',
          multiple: false,
        });
      },
      multiplePhotos: async () => {
        return await picker<Image[] | string>({
          mediaType: 'photo',
          multiple: true,
        });
      },
      singleVideo: async () => {
        return await picker<Video | string>({
          mediaType: 'video',
          multiple: false,
        });
      },
      multipleVideos: async () => {
        return await picker<Video[] | string>({
          mediaType: 'video',
          multiple: true,
        });
      },
      allMedia: async () => {
        return await picker<Image[] | Video[] | string>({
          multiple: true,
        });
      },
      openCamera: async () => {
        return await ImagePicker.openCamera({
          cropping: true,
          mediaType: 'photo',
        }).then(image => {
          return image;
        });
      },
      customPicker: async (pickerOptions: Options) => {
        if (pickerOptions && typeof pickerOptions == 'object') {
          return await picker({...pickerOptions});
        }
        return 'Please provide params of image picker in object';
      },
      openModal: () => {
        setModalVisible(true);
      },
      closeModal: () => {
        setModalVisible(false);
      },
    }));

    const onPick = async (item: {name: string}) => {
      switch (item?.name) {
        case 'Gallery':
          await picker<Image[] | Video[] | string>({
            multiple: true,
          }).then(value => {
            onSelectItem && onSelectItem(value);
            setModalVisible(false);
          });
          break;
        case 'Camera':
          await ImagePicker.openCamera({
            cropping: true,
          })
            .then(image => {
              return image;
            })
            .then(value => {
              onSelectItem && onSelectItem(value);
              setModalVisible(false);
            });
          break;
        default:
          setModalVisible(false);
          break;
      }
    };

    return (
      <View style={style}>
        {children}
        <ModalPicker
          isVisible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          data={data}
          onSelectItem={item => {
            onPick(item);
          }}
        />
      </View>
    );
  },
);

export default React.memo(MediaPicker);
