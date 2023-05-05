jest.mock('react-native-webview', () => {
    const { View } = require('react-native');
    return {
      WebView: View,
    };
  });

jest.mock("nanoid", () => {
    return { nanoid: () => "1234" };
  });

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock("../../imports/components/ModalRN/ModalRN", () => {
  const { View } = require('react-native');
  return {
    ModalRN: View,
  };
})

jest.mock('realm', () => {
  return require('./realm-mock');
});

