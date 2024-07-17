import React from 'react';
import {Pressable, View} from 'react-native';
import {Image} from '@components';
import {RoundShapeImageProps} from '@customTypes';
import styles from './Styles';

/**
 * RoundShapeImage component.
 */
const RoundShapeImage: React.FC<RoundShapeImageProps> = ({
  imageUrl,
  height,
  editIconSource,
  editIcon,
  onPress,
}) => {
  return (
    <View style={styles.profileImageStyles}>
      <Pressable
        style={[
          styles.topImageView,
          {
            height: height,
            width: height,
            borderRadius: height / 2,
          },
        ]}
        disabled={!editIcon}
        onPress={onPress}>
        <Image
          source={imageUrl}
          style={styles.profileStyle}
          resizeMode={'stretch'}
        />
      </Pressable>
      {editIcon && (
        <Pressable style={styles.innerImageView} onPress={onPress}>
          {editIconSource && (
            <Image
              source={editIconSource}
              style={styles.innerImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default React.memo(RoundShapeImage);

RoundShapeImage.defaultProps = {
  editIconSource: {uri: 'https://pngimg.com/uploads/mario/mario_PNG53.png'},
};
