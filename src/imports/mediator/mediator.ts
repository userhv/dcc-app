import { EnumMediator } from './EnumMediator';
import { rssApi } from '../../api/rssApi';
import * as rssParser from 'react-native-rss-parser';
import { DOMParser } from '@xmldom/xmldom'

export interface ITabelaDisciplinas {
    codigo: string;
    disciplina: string;
    horario: string;
    professor?: string;
    sala?: string;
    turma?: string;
}

enum Semestre {
    PRIMEIRO = '1º Semestre',
    SEGUNDO = '2º Semestre'
}

export interface ISemestres {
    primeiroSemestre:rssParser.FeedItem[];
    segundoSemestre: rssParser.FeedItem[];
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
            case EnumMediator.EVENTOS:
                return await rssApi('https://dcc.ufmg.br/category/evento/feed/');
            case EnumMediator.PALESTRAS:
                return await rssApi('https://dcc.ufmg.br/category/palestra/feed/');
            case EnumMediator.PROFESSORES:
                return await rssApi(`https://dcc.ufmg.br/?s&post_type=professor&action=-1&m=0&cat=153&filter_action=Filtrar&paged=${row}&action2=-1&feed=atom`)
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
        const anoAtual = new Date().getFullYear().toString();
        const ofertaDisciplinasDisplay = 'Oferta de disciplinas'.toLowerCase();        
        const ofertasGeraisAtual = ofertasGerais.filter((oferta)=> oferta.title.toLowerCase().includes(anoAtual.toLowerCase()) && oferta.title.toLowerCase().includes(ofertaDisciplinasDisplay))
        const primeiroSemestre = ofertasGeraisAtual.filter((oferta) => oferta.title.toLowerCase().includes(Semestre.PRIMEIRO.toLowerCase()));
        const segundoSemestre = ofertasGeraisAtual.filter((oferta) => oferta.title.toLowerCase().includes(Semestre.SEGUNDO.toLowerCase()));
        return {primeiroSemestre, segundoSemestre}
    }

    converteTabelaGeral = (items: rssParser.FeedItem): ITabelaDisciplinas[] => {
        const data =  items.content && items.content.split("<figure class=\"wp-block-table\">").pop().slice(0, -10);
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
            for(let i = 0; i < arrHeader.length; i++){
                if(arrHeader[i] === 'horario'){
                    obj[arrHeader[i]] = `${arrBody[i]} - ${arrBody[i+1]}`
                }else if(arrHeader[i] === 'professor'){
                    obj[arrHeader[i]] = arrBody[i+1];
                }else
                    obj[arrHeader[i]] = arrBody[i];
            
            }
            objParsed.push(obj as ITabelaDisciplinas);
        }
        return objParsed;
     }
}


export const mediator = new Mediator();