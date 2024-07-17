module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@contexts': './src/contexts',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@theme': './src/theme',
          '@customTypes': './src/types',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@api': './src/api',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
