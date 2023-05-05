import React from 'react';
import { CardNoticias } from "../CardNoticias";
import { render} from '@testing-library/react-native';
import { FeedItem } from 'react-native-rss-parser';
import { GeneralComponentsContext  } from '../../../../components/GeneralComponents/GeneralComponents';
describe('cardNoticias', () => {

  const titulo = "Seguramente não estaria onde estou se não tivesse passado pelo DCC/UFMG”, garantiu ex-aluno"
  const descricao = "Aluno do mestrado e do doutorado no Programa de Pós-graduação em Ciência da Computação (PPGCC) da UFMG, André Luiz Lins de Aquino entrou em 2002 para o mestrado, seguiu para o doutorado e o concluiu em 2008."
  const url = "https://dcc.ufmg.br/seguramente-nao-estaria-onde-estou-se-nao-tivesse-passado-pelo-dcc-ufmg-garantiu-ex-aluno"


  const mockValues = {
    showModal: jest.fn(),
    showSnackBar: jest.fn(),
    showDialog: jest.fn(),
    getDimensions: jest.fn(), 
  }

  const MockAuthContext = () => ( React.createContext(mockValues) )

  jest.mock("../../../../components/GeneralComponents/GeneralComponents", () => ({
  
    __esModule: true,
    default: MockAuthContext
  }))
  test('renderizaCardNoticias', () => {
        render(
          <GeneralComponentsContext.Provider value={mockValues}>
            <CardNoticias url={url} noticia={{description: descricao, links:[{rel: '', url: url}], title: titulo, media: [{type: '', url: ''}]} as FeedItem}/>
        </GeneralComponentsContext.Provider>
        )
    });


    
});