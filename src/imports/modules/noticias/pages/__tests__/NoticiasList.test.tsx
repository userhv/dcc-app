import React from 'react';
import { render} from '@testing-library/react-native';
import { NoticiasList } from '../noticiasList';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
describe('noticiasList', () => {
    test('renderizaNoticiasList', () => {
        render(<View> <Text> OII </Text></View>)
    });

});