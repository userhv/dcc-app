import { EnumMediator } from './EnumMediator';
import { rssApi } from '../../api/rssApi';

class  Mediator {
    constructor(){
        this.selecionaRequisicao = this.selecionaRequisicao.bind(this);
    }

    selecionaRequisicao =  async (key: string) => {
        switch (key) {
            case EnumMediator.NOTICIAS:
                return await rssApi('https://dcc.ufmg.br/feed');
            case EnumMediator.EVENTOS:
                return await rssApi('https://dcc.ufmg.br/category/evento/feed/');
            case EnumMediator.PALESTRAS:
                return await rssApi('https://dcc.ufmg.br/category/palestra/feed/');
            default:
                break;
        }
    }
}


export const mediator = new Mediator();