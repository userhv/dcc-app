module.exports = {
    preset: 'react-native',
    "setupFilesAfterEnv": [
        "@testing-library/jest-native/extend-expect"
      ],
      "setupFiles": [
        "./node_modules/react-native-gesture-handler/jestSetup.js",
        "./tests/__mocks__/mocks.js"
      ],
      "transformIgnorePatterns": [
        "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-navigation)/)"
      ]
  };