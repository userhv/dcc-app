import { mediator } from "../mediator";
import * as rssParser from 'react-native-rss-parser';

describe.only('mediator', () => {
    let dadosFeed: rssParser.FeedItem[] | undefined;
    beforeEach(async() => {
        dadosFeed = [
            {
            id: 'id_ano_2023',
            title: 'Oferta De Disciplinas – 2º Semestre de 2023',
            links: [{
                rel: '',
                url: ''
            }],
            description: '',
            content: 
            `
            <figure class="wp-block-table">
                <table>
                <tbody>
                <tr>
                <td>Código</td>
                <td>Turma</td>
                <td>Disciplina</td>
                <td>Horário</td>
                <td>Sala</td>
                <td>Professor</td>
                </tr>
                <tr>
                <td>DCC639</td>
                <td>TZ</td>
                <td>ÁLGEBRA LINEAR COMPUTACIONAL</td>
                <td>17:00 18:40 (Ter)<br>17:00 18:40 (Qui)</td>
                <td>DCC-2008</td>
                <td>ALEXANDRE SALLES DA CUNHA</td>
                </tr>
                <tr>
                <td>DCC639</td>
                <td>TZ1</td>
                <td>ÁLGEBRA LINEAR COMPUTACIONAL</td>
                <td>17:00 18:40 (Ter)<br>17:00 18:40 (Qui)</td>
                <td>DCC-2013</td>
                <td>ANA PAULA COUTO DA SILVA</td>
                </tr>
                <tr>
                <td>DCC639</td>
                <td>TZ2</td>
                <td>ÁLGEBRA LINEAR COMPUTACIONAL</td>
                <td>17:00 18:40 (Ter)<br>17:00 18:40 (Qui)</td>
                <td>DCC-2013</td>
                <td>ANA PAULA COUTO DA SILVA</td>
                </tr>
                <tr>
                <td>DCC639</td>
                <td>TZ3</td>
                <td>ÁLGEBRA LINEAR COMPUTACIONAL</td>
                <td>17:00 18:40 (Qui)<br>17:00 18:40 (Ter)</td>
                <td>DCC-2013</td>
                <td>ANA PAULA COUTO DA SILVA</td>
                </tr>
                <tr>
                <td>DCC206</td>
                <td>TN</td>
                <td>ALGORITMOS I</td>
                <td>14:55 16:35 (Ter)<br>14:55 16:35 (Qui)</td>
                <td>CAD3. Sala 311</td>
                <td>GUILHERME GOMES</td>
                </tr>
                <tr>
                <td>DCC206</td>
                <td>TN1</td>
                <td>ALGORITMOS I</td>
                <td>14:55 16:35 (Ter)<br>14:55 16:35 (Qui)</td>
                <td>CAD3. Sala 311</td>
                <td>GUILHERME GOMES</td>
                </tr>
                <tr>
                <td>DCC206</td>
                <td>TW</td>
                <td>ALGORITMOS I</td>
                <td>19:00 20:40 (Ter)<br>19:00 20:40 (Qui)</td>
                <td>CAD3. Sala 312</td>
                <td>GUILHERME GOMES</td>
                </tr>
                <tr>
                </tbody>
                </table>
                </figure>
            `
            ,
            authors: [],
            categories: [],
            media: [],
            published: '',
            enclosures: [],
            itunes: {
                authors: [],
                block: '',
                duration: '',
                explicit: '',
                image: '',
                isClosedCaptioned: '',
                order: '',
                subtitle: '',
                summary:''
            }
            
        },
        {
            id: 'id_ano_2022',
            title: 'Oferta De Disciplinas – 2º Semestre de 2022',
            links: [{
                rel: '',
                url: ''
            }],
            description: '',
            content: '',
            authors: [],
            categories: [],
            media: [],
            published: '',
            enclosures: [],
            itunes: {
                authors: [],
                block: '',
                duration: '',
                explicit: '',
                image: '',
                isClosedCaptioned: '',
                order: '',
                subtitle: '',
                summary:''
            }
            
        }]
       
    })

    it('testar o comportamento da função tratamento de dados', () => {
        const {anoAtual, anoAnterior} = mediator.tratamentoDados(dadosFeed!);
        expect(anoAtual[0].id).toEqual('id_ano_2023')
    });

    it('testar o comportamento da função tratamento de dados', () => {
        const {anoAtual, anoAnterior} = mediator.tratamentoDados(dadosFeed!);
        expect(anoAnterior[0].id).toEqual('id_ano_2022')
    });

    it('comportamento da função de conversão da tabela de disciplinas', () => {
        const objeto =  mediator.converteTabelaGeral(dadosFeed![0]);
        expect(objeto[0].codigo).toEqual('DCC639')
        expect(objeto[0].turma).toEqual('TZ')
    });
});