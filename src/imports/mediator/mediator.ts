import { EnumMediator } from './EnumMediator';
import { rssApi } from '../../api/rssApi';

class  Mediator {
    constructor(){
        this.selecionaRequesicao = this.selecionaRequesicao.bind(this);

    }

     selecionaRequesicao =  async (key: string) => {
        switch (key) {
            case EnumMediator.NOTICIAS:
                return await rssApi('https://dcc.ufmg.br/feed/rss');
            default:
                break;
        }
    }
}


export const mediator = new Mediator();