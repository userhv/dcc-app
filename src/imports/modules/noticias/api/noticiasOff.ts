
import { BaseOffline } from '../../../../bd/baseOffline';
import { noticiasRealmSch } from '../sch/noticiasRealmSch';
import { INoticias, noticiasSch } from '../sch/noticiasSch';

class NoticiasOff extends BaseOffline<INoticias> {
	constructor() {
		super('noticiasOff', noticiasSch, noticiasRealmSch);
	}
}

export const noticiasOff = new NoticiasOff();
