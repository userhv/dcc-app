import React from 'react';
import { CardNoticias } from "../CardNoticias";
import { fireEvent, render} from '@testing-library/react-native';
import { FeedItem } from 'react-native-rss-parser';


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

describe('cardNoticias', () => {
    test('renderizaCardNoticias', () => {
        render(<CardNoticias url={''} noticia={{description: "oii", links:[{rel: '', url: ''}], title: 'Teste'} as FeedItem}/>)
    });


    // test('renderizaCardNoticiasComDados', () => {
    //     const urlTest = 'https://dcc.ufmg.br/inscricoes-abertas-para-a-segunda-turma-do-curso-gratuito-em-tecnologia-de-comunicacao-movel-5g-promovido-pelo-dcc-ufmg';
    //    const { getByTestId } =  render(<CardNoticias url={urlTest} noticia={'' as unknown as FeedItem}/>)
        
    //    expect(getByTestId('url')).toBeTruthy();
    
    // });
});