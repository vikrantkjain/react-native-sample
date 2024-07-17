import React from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
const List: React.FC<FlashListProps<any>> = props => {
  return (
    <FlashList
      {...props}
      estimatedItemSize={50}
      keyExtractor={(_, i) => i.toString()}
    />
  );
};

export default React.memo(List);
