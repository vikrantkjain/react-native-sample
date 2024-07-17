import {ThemeProp} from '../types/interface';
import Colors from './Colors';
const Theme: {colors: ThemeProp} = {
  colors: {
    primary: Colors.$xpo_blue__700,
    primaryContainer: Colors.$xpo_light_background,
    onPrimary: Colors.$xpo_white,
    secondary: Colors.$xpo_gray__200,
    onSecondary: Colors.$xpo_black_opaque_dark,
    tertiary: Colors.$xpo_pine__500,
    onTertiary: Colors.$xpo_grey__985,
    surface: Colors.$xpo_grey__150,
    onSurface: Colors.$xpo_grey__950,
    surfaceVariant: Colors.$notify_background,
    onSurfaceVariant: Colors.$xpo_gray__200,
    background: Colors.$xpo_gray__100,
    onBackground: Colors.$xpo_black,
    outline: Colors.$image_tint,
    outlineVariant: Colors.$xpo_grey__500,
    inverseSurface: Colors.$xpo_grey__800,
    inverseOnSurface: Colors.$xpo_grey__150,
    error: Colors.$xpo_red__400,
  },
};

export {Theme};
