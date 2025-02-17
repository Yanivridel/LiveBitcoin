// module.exports = function (api) {
//   api.cache(true);
//   const plugins = [];

//   return {
//     presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

//     plugins,
//   };
// };

module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      'module:react-native-dotenv', // Add this for .env support
    ],
  };
};