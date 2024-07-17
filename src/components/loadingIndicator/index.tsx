import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {CERULEAN} from '@constants';
import {MatrixConstant, LoadingProps} from '@customTypes';

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  loaderStyle,
  color,
  circleSize,
}) => {
  return (
    <>
      {isLoading ? (
        <View style={Styles.mainView}>
          <View style={[Styles.loaderStyle, loaderStyle]}>
            <ActivityIndicator
              color={color ? color : CERULEAN}
              size={circleSize ? circleSize : 80}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};
export default React.memo(Loading);

const Styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 20,
  },
  loaderStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    marginTop: 55,
    height: MatrixConstant.SCREEN_HEIGHT,
    width: MatrixConstant.SCREEN_WIDTH,
    justifyContent: 'flex-end',
  },
  customBlurOverlayStyle: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -150,
  },
});
