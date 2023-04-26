import React from 'react';
import { CardNoticias } from "../CardNoticias";
import { fireEvent, render} from '@testing-library/react-native';

describe('cardNoticias', () => {
    test('renderizaCardNoticias', () => {
        render(<CardNoticias url={''} noticia={{}}/>)
    });


    test('renderizaCardNoticiasComDados', () => {
        const urlTest = 'https://dcc.ufmg.br/inscricoes-abertas-para-a-segunda-turma-do-curso-gratuito-em-tecnologia-de-comunicacao-movel-5g-promovido-pelo-dcc-ufmg';
       const { getByTestId } =  render(<CardNoticias url={urlTest} noticia={{}}/>)
        
       expect(getByTestId('url')).toBeTruthy();
    
    });
});