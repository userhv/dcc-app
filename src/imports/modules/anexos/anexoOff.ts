
import { BaseOffline } from '../../../bd/baseOffline';
import { requestRealm } from '../../libs/requestRealm';
import { IAnexo } from './IAnexo';
import { anexoRealmSch } from './anexoRealmSch';
import { anexoSch } from './anexoSch';


class AnexoOff extends BaseOffline<IAnexo> {
	constructor() {
		super('anexoOff', anexoSch, anexoRealmSch);
		this.retornaAnexo = this.retornaAnexo.bind(this);
		this.salvaCadastro = this.salvaCadastro.bind(this);
	}
	retornaAnexo = async(email: string, tipo: string) => {
		return this.find('email == $0 && tipo == $1', email, tipo);
	}
	salvaCadastro = async (arquivo: IAnexo) => {
		await this.upsert(arquivo)
	}
}

export const anexoOff = new AnexoOff();
