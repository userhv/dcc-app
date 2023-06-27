import { EnumMediator } from './EnumMediator';
import { rssApi } from '../../api/rssApi';

class  Mediator {
    constructor(){
        this.selecionaRequisicao = this.selecionaRequisicao.bind(this);
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
                return await rssApi('https://dcc.ufmg.br/category/destaque/feed')
            default:
                break;
        }
    }
}


export const mediator = new Mediator();