require('dotenv').config();
const template = process.env.REACT_APP_TEMPLATE || 'default';
// console.log('babel', template);
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': [`./shared/assets/${template}`, `./shared/assets/default`],
          '@components': [`./shared/components/${template}`, `./shared/components/default`],
          '@library': './library',
          '@theme': [`./shared/theme/${template}`, `./shared/theme/default`],
          '@pages': './shared/pages',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
