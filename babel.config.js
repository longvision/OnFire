module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
<<<<<<< HEAD
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
=======
    ['module:react-native-dotenv'],
    // {
    //   moduleName: '@env',
    //   path: '.env',
    //   blacklist: null,
    //   whitelist: null,
    //   safe: false,
    //   allowUndefined: false,
    // },
    // ],
>>>>>>> ae2c67591a4ce6e213ef6b81c65d28bc866d154c
  ],
};
