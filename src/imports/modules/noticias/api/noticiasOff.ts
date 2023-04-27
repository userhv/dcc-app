
import { BaseOffline } from '../../../../bd/baseOffline';
import { noticiasRealmSch } from '../sch/noticiasRealmSch';
import { INoticias, noticiasSch } from '../sch/noticiasSch';
import * as rssParser from 'react-native-rss-parser';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid';

class NoticiasOff extends BaseOffline<INoticias> {
	constructor() {
		super('noticiasOff', noticiasSch, noticiasRealmSch);
		this.insereNoticia = this.insereNoticia.bind(this);
		this.removeNoticia = this.removeNoticia.bind(this);
	}

	insereNoticia = async (noticia: rssParser.FeedItem) => {
		const obj = {_id: nanoid(), description: noticia.description, url: noticia.links[0].url, title: noticia.title};
		await noticiasOff.insert(obj);
	}

	removeNoticia = async (noticia: INoticias | undefined) => {
		if(noticia)
			await noticiasOff.remove(noticia);
	}
}

export const noticiasOff = new NoticiasOff();
