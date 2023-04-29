
import { BaseOffline } from '../../../../bd/baseOffline';
import { noticiasRealmSch } from '../sch/noticiasRealmSch';
import { INoticias, noticiasSch } from '../sch/noticiasSch';
import * as rssParser from 'react-native-rss-parser';

class NoticiasOff extends BaseOffline<INoticias> {
	constructor() {
		super('noticiasOff', noticiasSch, noticiasRealmSch);
		this.insereNoticia = this.insereNoticia.bind(this);
		this.removeNoticia = this.removeNoticia.bind(this);
		this.retornaNoticiasSalvas = this.retornaNoticiasSalvas.bind(this);
	}

	insereNoticia = async (noticia: rssParser.FeedItem) => {
		const obj = { 
			description: noticia.description, 
			url: noticia.links[0].url, 
			title: noticia.title,
			media: noticia.media
		};
		await noticiasOff.insert(obj);
	}

	removeNoticia = async (noticia: INoticias | undefined) => {
		if(noticia)
			await noticiasOff.remove(noticia);
	}

	retornaNoticiasSalvas = async () => {
		return await noticiasOff.getCollection();
	}
}

export const noticiasOff = new NoticiasOff();
