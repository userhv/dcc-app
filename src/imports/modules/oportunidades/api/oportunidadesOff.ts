
import { BaseOffline } from '../../../../bd/baseOffline';
import { oportunidadesRealmSch } from '../sch/oportunidadesRealmSch';
import { IOportunidade, oportunidadesSch } from '../sch/oportunidadesSch';
import * as rssParser from 'react-native-rss-parser';

class OportunidadesOff extends BaseOffline<IOportunidade> {
	constructor() {
		super('oportunidadesOff', oportunidadesSch, oportunidadesRealmSch);
		this.insereOportunidade = this.insereOportunidade.bind(this);
	}
	insereOportunidade = async (oportunidade: rssParser.FeedItem) => {
		const idOportunidade = oportunidade.id.substring(oportunidade.id.indexOf('=') + 1);
		const obj = { 
			_id: idOportunidade, 
			url: oportunidade.links[0].url, 
			...oportunidade
		};
		await oportunidadesOff.insert(obj);
	}
}

export const oportunidadesOff = new OportunidadesOff();
