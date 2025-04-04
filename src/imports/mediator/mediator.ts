import { EnumMediator } from './EnumMediator';
import { rssApi } from '../../api/rssApi';
import * as rssParser from 'react-native-rss-parser';
import { DOMParser } from '@xmldom/xmldom'

export interface ITabelaDisciplinas {
    codigo?: string;
    cod?: string;
    disciplina?: string;
    horario?: string;
    professor?: string;
    prof?: string;
    docente?: string;
    sala?: string;
    turma?: string;
}

export interface ISemestres {
    anoAtual:rssParser.FeedItem[];
    anoAnterior: rssParser.FeedItem[];
}

class  Mediator {
    constructor(){
        this.selecionaRequisicao = this.selecionaRequisicao.bind(this);
        this.converteTabelaGeral = this.converteTabelaGeral.bind(this);
        this.tratamentoDados = this.tratamentoDados.bind(this);
    }

    selecionaRequisicao =  async (key: string, row?: number) => {
        switch (key) {
            case EnumMediator.NOTICIAS:
                return await rssApi('https://dcc.ufmg.br/feed');
            case EnumMediator.OPORTUNIDADES:
                return await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=153&feed=atom');
            case EnumMediator.EVENTOS:
                return await rssApi('https://dcc.ufmg.br/category/evento/feed/');
            case EnumMediator.PALESTRAS:
                return await rssApi('https://dcc.ufmg.br/category/palestra/feed/');
            case EnumMediator.IC:
                return await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=153&cat=568&feed=atom');
            case EnumMediator.ESTAGIOS:
                return await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=153&cat=570&feed=atom');
            case EnumMediator.EMPREGO:
                return await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=153&cat=572&feed=atom');
            case EnumMediator.BOLSA_OUTROS:
                const mestrado = await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=153&cat=574&feed=atom');
                const doutorado = await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=153&cat=576&feed=atom');
                return mestrado?.concat(doutorado ?? []);
            case EnumMediator.PROFESSORES:
                const professores = await rssApi(`https://dcc.ufmg.br/?s&post_type=professor&action=-1&m=0&cat=153&filter_action=Filtrar&paged=${row}&action2=-1&feed=atom`);
                const professores_voluntarios = await rssApi(`https://dcc.ufmg.br/?s&post_type=professor&action=-1&m=0&cat=161&filter_action=Filtrar&paged=${row}&action2=-1&feed=atom`);
                return professores?.concat(professores_voluntarios ?? [])
            case EnumMediator.PROFESSORES_FOTO:
                const professores_foto =  await rssApi(`https://dcc.ufmg.br/?s&post_type=professor&action=-1&m=0&cat=153&filter_action=Filtrar&paged=${row}&action2=-1&feed=rss`);
                const professores_voluntarios_foto = await rssApi(`https://dcc.ufmg.br/?s&post_type=professor&action=-1&m=0&cat=161&filter_action=Filtrar&paged=${row}&action2=-1&feed=rss`);
                return professores_foto?.concat(professores_voluntarios_foto ?? [])
            case EnumMediator.DESTAQUE:
                return await rssApi('https://dcc.ufmg.br/category/destaque/feed');
            case EnumMediator.DISCIPLINAS:
                const dadosGerais =  await rssApi('https://dcc.ufmg.br/category/oferta-de-disciplinas/feed/');
                return dadosGerais ? this.tratamentoDados(dadosGerais) : undefined;
            default:
                break;
        }
    }

    tratamentoDados = (ofertasGerais: rssParser.FeedItem[]) => {
        const ultimoAnoEncontrado = ofertasGerais[0].title.split(' ')[ofertasGerais[0].title.split(' ').length-1]
        const anoAtualData = +ultimoAnoEncontrado;
        const anotAnterior = anoAtualData - 1;
        const ofertaDisciplinasDisplay = 'Oferta de disciplinas'.toLowerCase();        
        const ofertasGeraisAtual = ofertasGerais.filter((oferta)=> (oferta.title.toLowerCase().includes(anoAtualData.toString().toLowerCase()) 
            || oferta.title.toLowerCase().includes(anotAnterior.toString().toLowerCase()))  && oferta.title.toLowerCase().includes(ofertaDisciplinasDisplay))
        const anoAtual = ofertasGeraisAtual.filter((oferta) => oferta.title.toLowerCase().includes(anoAtualData.toString().toLowerCase()));
        const anoAnterior = ofertasGeraisAtual.filter((oferta) => oferta.title.toLowerCase().includes(anotAnterior.toString().toLowerCase()));
        return {anoAtual, anoAnterior}
    }

    converteTabelaGeral = (items: rssParser.FeedItem): ITabelaDisciplinas[] => {
        let data =  items.content && items.content.split("<table>").pop();
        data = "<table>" + data;
        const posicaoInicial = data.indexOf("</table>");
        data = data.slice(0, posicaoInicial);
        data = data + "</table>";
        const parsed  = new DOMParser().parseFromString(data, 'text/html').getElementsByTagName('tr');
        let childHeader = parsed[0].firstChild;
        const arrHeader: any[] = [];
          while(childHeader) {
            arrHeader.push(childHeader.textContent?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
            childHeader = childHeader?.nextSibling;
          }

        const objParsed: ITabelaDisciplinas[] = []
        for(let i = 1; i < parsed.length; i++){
            let childBody = parsed[i].firstChild;
            const arrBody = [];
            while(childBody) {
                arrBody.push(childBody.textContent)
                childBody = childBody?.nextSibling;
            }
            let obj: {[key:string]: any} = {}
            if(arrBody.length === arrHeader.length){
                for(let i = 0; i < arrHeader.length; i++){
                    obj[arrHeader[i]] = arrBody[i];
                }
            }else if(arrBody.length === arrHeader.length + 1){
                for(let i = 0; i < arrHeader.length; i++){
                    if(arrHeader[i] === 'horario'){
                        obj[arrHeader[i]] = `${arrBody[i]} - ${arrBody[i+1]}`
                    }else if(arrHeader[i] === 'professor'){
                        obj[arrHeader[i]] = arrBody[i+1];
                    }else
                        obj[arrHeader[i]] = arrBody[i];
                }
            }
            objParsed.push(obj as ITabelaDisciplinas);
        }
        return objParsed;
     }
}


export const mediator = new Mediator();