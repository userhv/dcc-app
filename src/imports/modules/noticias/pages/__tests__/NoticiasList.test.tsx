import React from 'react';
import { render} from '@testing-library/react-native';
import { NoticiasList } from '../noticiasList';

jest.mock('react-native-webview', () => ({
    default: () => jest.fn() // or any mocked component instead of native view,
  }))

  jest.mock("nanoid", () => {
    return { nanoid: () => "1234" };
  });

  jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('noticiasList', () => {
    test('renderizaNoticiasList', () => {
        render(<NoticiasList/>)
    });

});