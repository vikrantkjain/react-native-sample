import React, {ForwardedRef, forwardRef} from 'react';
import {EasyToastProps, ToastRefType} from '@customTypes';
import EasyToastFnComp from './EasyToastFn';
const Toast = forwardRef(
  (props: EasyToastProps, ref: ForwardedRef<ToastRefType>) => {
    return <EasyToastFnComp {...props} ref={ref} />;
  },
);

export default React.memo(Toast);
