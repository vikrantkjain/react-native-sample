import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  useCameraDevices,
  Camera,
  CameraDevices,
  CameraDevice,
} from 'react-native-vision-camera';
import {Images} from '@constants';
import ImagePicker from 'react-native-image-crop-picker';
import {printConsole} from '@utils';
import {CameraProps} from '@customTypes';

const MainComponent: React.FC<CameraProps> = memo(
  ({openCamera, onCapture, onBack, cropping, width, height}) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [cameraPosition, setCameraPosition] = useState<boolean>(false);
    const [device, setDevice] = useState<CameraDevice>();
    const [flash, setFlash] = useState<boolean>(false);
    const devices: CameraDevices = useCameraDevices();
    const camera = useRef<Camera>(null);

    const defaultGalleryOptions = {
      cropping: true,
      cropperToolbarTitle: 'Edit Image',
      compressImageQuality: 0.8,
      freeStyleCropEnabled: true,
    };

    const setCamerPosition = useCallback(() => {
      setDevice(devices?.back);
    }, [devices]);

    useEffect(() => {
      requestCameraPermission();
      setCamerPosition();
    }, [devices, setCamerPosition]);

    const requestCameraPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      // setHasPermission(status === 'authorized');
    };

    if (!hasPermission) {
      <View style={styles.noPermissionTextContainerStyle}>
        <Text>No Permission</Text>
      </View>;
    }

    if (device === undefined) {
      return <ActivityIndicator color={'red'} />;
    }

    const takephoto = async () => {
      const photo = await camera?.current?.takePhoto({
        flash: flash ? 'on' : 'off',
        // quality: 85,
        // skipMetadata: true,
      });
      let path: string = `file://${photo?.path}`;
      if (cropping) {
        ImagePicker.openCropper({
          path: path,
          width: width,
          height: height,
          mediaType: 'photo',
          ...defaultGalleryOptions,
        })
          .then(image => {
            onCapture && onCapture(image);
          })
          .catch(err => {
            onCapture && onCapture(err);
            printConsole('err', err);
          });
      } else {
        // onCapture && onCapture({...photo, path});
        ImagePicker.openCropper({
          path: path,
          width: photo?.width ?? 1000,
          height: photo?.height ?? 1000,
          mediaType: 'photo',
          ...defaultGalleryOptions,
        })
          .then(image => {
            onCapture && onCapture(image);
          })
          .catch(err => {
            onCapture && onCapture(err);
            printConsole('err', err);
          });
      }
    };

    const rotateCamera = () => {
      if (cameraPosition) {
        setCameraPosition(false);
        setDevice(devices.back);
      } else {
        setCameraPosition(true);
        setDevice(devices.front);
      }
    };

    const onFlash = async () => {
      setFlash(!flash);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Camera
          ref={camera}
          photo={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={openCamera}
          // flash={true}
          // preset="photo"
        />
        <TouchableOpacity onPress={onBack} style={styles.backArrorViewStyle}>
          <Image source={Images.ic_back} style={styles.backArrorStyle} />
        </TouchableOpacity>
        <View style={styles.buttonStyle}>
          <TouchableOpacity
            onPress={rotateCamera}
            style={styles.rotateCameraButtonStyle}>
            <Image
              source={Images.ic_rotate_Camera}
              style={styles.sideButtonStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={takephoto} style={styles.takePhotoStyle} />
          <TouchableOpacity
            onPress={onFlash}
            style={flash ? styles.onStyle : styles.offStyle}>
            <Image
              source={Images.ic_flash}
              style={[styles.imageStyle, {tintColor: flash ? 'black' : '#fff'}]}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  },
);

const LaunchCamera: React.FC<CameraProps> = props => {
  const {openCamera} = props;
  if (openCamera) {
    return <MainComponent {...props} />;
  } else {
    return null;
  }
};

export default React.memo(LaunchCamera);

LaunchCamera.defaultProps = {
  openCamera: false,
  cropping: false,
  width: 400,
  height: 400,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 20,
    height: '100%',
    width: '100%',
  },
  noPermissionTextContainerStyle: {flex: 1},
  takePhotoStyle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#fff',
  },
  rotateCameraButtonStyle: {alignSelf: 'center'},
  buttonStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  sideButtonStyle: {height: 50, width: 50, tintColor: '#fff'},
  onStyle: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  offStyle: {
    alignSelf: 'center',
    padding: 10,
  },
  imageStyle: {
    height: 35,
    width: 35,
  },
  backArrorViewStyle: {
    height: 30,
    width: 30,
    margin: 15,
    zIndex: 1,
  },
  backArrorStyle: {
    height: 30,
    width: 30,
  },
});
