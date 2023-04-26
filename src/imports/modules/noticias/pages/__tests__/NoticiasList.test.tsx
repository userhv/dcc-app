import React from 'react';
import { render} from '@testing-library/react-native';
import { NoticiasList } from '../noticiasList';

describe('noticiasList', () => {
    test('renderizaNoticiasList', () => {
        render(<NoticiasList/>)
    });

});