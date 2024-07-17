import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LIGHT_GRAY} from '@constants';
import {DividerProps, MatrixConstant} from '@customTypes';

const Divider: React.FC<DividerProps> = ({style}) => {
  return (
    <>
      <View style={[styles.divider, style]} />
    </>
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: MatrixConstant.SCREEN_WIDTH,
    height: 0.8,
    backgroundColor: LIGHT_GRAY,
  },
});
