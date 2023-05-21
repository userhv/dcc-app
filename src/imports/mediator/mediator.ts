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
            case EnumMediator.OPORTUNIDADES:
                return await rssApi('https://dcc.ufmg.br/oportunidade/feed/');
            case EnumMediator.EVENTOS:
                return await rssApi('https://dcc.ufmg.br/category/evento/feed/');
            case EnumMediator.PALESTRAS:
                return await rssApi('https://dcc.ufmg.br/category/palestra/feed/');
            case EnumMediator.IC:
                return await rssApi('https://dcc.ufmg.br/?s&post_type=oportunidade&cat=iniciacao-cientifica&feed=atom');
            default:
                break;
        }
    }
}


export const mediator = new Mediator();