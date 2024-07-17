import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import {ApiConstants, AppConstants} from '@constants';
import {MatrixConstant} from '@customTypes';

export const getWidth = (value = 0) => {
  const width = (MatrixConstant.SCREEN_WIDTH * value) / 100;
  return width;
};

export const getHeight = (value = 0) => {
  const height = (MatrixConstant.SCREEN_HEIGHT * value) / 100;
  return height;
};

export const convertToSeconds = (time = '') => {
  if (time) {
    return time
      .split(':')
      .reverse()
      .reduce<number>(
        (prev: number, curr: string, i: number) =>
          prev + +curr * Math.pow(60, i),
        0,
      );
  }
};

export const capitalize = (value = '') => {
  let uppercaseFirstLetter = '';
  if (value) {
    uppercaseFirstLetter =
      String(value).charAt(0).toUpperCase() + String(value).slice(1);
  } else {
    uppercaseFirstLetter = '0';
  }
  return uppercaseFirstLetter;
};

/**
 * This function will print console and handle when to show console.
 * @param {*} TAG
 * @param {*} param
 */
export const printConsole = (TAG: string = 'TAG', param: unknown = 'param') => {
  if (AppConstants.IS_LOG) {
    console.log(TAG, param);
  }
};

/**
 * This function is used to single image from Gallery.
 * @param {*} cropit
 * @param {*} circular
 * @returns uri of image
 */
export const pickSingle = (cropit: boolean, circular = false) => {
  return new Promise((resolve, reject) => {
    ImagePicker.openPicker({
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then(
        image => {
          printConsole('received image', image);
          image ? resolve(image) : reject('error');
        },
        error => printConsole(error),
      )
      .catch(error => printConsole(error));
  });
};

/**
 * This function is used to single image from camera.
 * @param {*} cropping
 * @param {*} mediaType
 * @returns uri of image
 */
export const pickSingleWithCamera = (
  cropping: boolean,
  mediaType: 'video' | 'photo' = 'photo',
) => {
  return new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      cropping: cropping,
      includeExif: true,
      mediaType,
    })
      .then(
        image => {
          image ? resolve(image) : reject('error');
        },
        error => printConsole(error),
      )
      .catch(error => printConsole(error));
  });
};

/**
 * This function is used to show Toast.
 * @param {*} msg String to show as message
 * @returns nothing
 */
export const ShowToast = (msg = '') => {
  return setTimeout(() => {
    Toast.show(msg, Toast.SHORT);
  }, 250);
};

/**
 * This function is used to convert time into 24 hrs.
 * @param {*} time12h
 * @returns converted time
 */
export const convertTime12to24 = (time12h = '') => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM' || modifier === 'pm') {
    hours = `${parseInt(hours, 10) + 12}`;
  }
  return hours + ':' + minutes;
};

/**
 * This function is used to convert UTC to local time.
 * @param {*} UTC time which need to convert
 * @returns converted Local time
 */
export const renderTimeFromUTC = (time = '') => {
  let ngbDt;
  let timeData;
  const local = moment.utc(time).local().format(AppConstants.TIME_FORMAT_APP);
  timeData = local.split(':');
  if (timeData && timeData.length === 3) {
    ngbDt = {
      hour: parseInt(timeData[0], 10),
      minute: parseInt(timeData[1], 10),
      second: 0,
    };
  } else {
    ngbDt = {hour: 0, minute: 0, second: 0};
  }
  return ngbDt;
};

/**
 * This function is used to get current date.
 * @returns current date/time format
 */
export const getCurrentDate = () => {
  return moment().format(ApiConstants.SERVER_DATE_TIME_FORMAT);
};
export const resetLocalData = () => {};

export const ratingCount = (rating: number): number => {
  if (rating && typeof rating == 'number') {
    if (rating > 0) {
      const count = Math.round(rating * 10) / 10;
      const arr = `${count}`.split('.');
      if (arr.length > 1) {
        if (+arr[1] > 5) {
          return +arr[0] + 1;
        } else if (+arr[1] >= 3) {
          return +`${arr[0]}.5`;
        }
        return +arr[0];
      }
      return +arr[0];
    }
    return 0;
  }
  return 0;
};
/**
 *
 * @param initialRating
 * @param starHeight
 * @param spaceBetween
 * @param maxRating
 * @returns ratingPosition
 */
export const initialRating_ = (
  initialRating: number,
  starHeight: number,
  spaceBetween: number,
  maxRating: number,
) => {
  if (initialRating > maxRating) {
    const rate1 =
      maxRating * starHeight + spaceBetween * +`${initialRating}`.split('.')[0];
    return rate1;
  }
  const rate =
    initialRating * starHeight +
    spaceBetween * +`${initialRating}`.split('.')[0];
  return rate;
};
