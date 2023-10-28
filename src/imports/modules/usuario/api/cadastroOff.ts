
import { BaseOffline } from '../../../../bd/baseOffline';
import { ErrorOffline } from '../../../../bd/errorBaseOffline';
import { anexoOff } from '../../anexos/anexoOff';
import { cadastroRealmSch } from '../sch/sch/cadastroRealmSch';
import { ICadastro, cadastroSch } from '../sch/sch/cadastroSch';

class CadastroOff extends BaseOffline<ICadastro> {
	constructor() {
		super('cadastroOff', cadastroSch, cadastroRealmSch);
		this.encontraCadastro = this.encontraCadastro.bind(this);
		this.removeCadastro = this.removeCadastro.bind(this);
	}
	encontraCadastro = async (cadastro: ICadastro) => {
		return this.find(`email == $0`, cadastro.email);
	}
	removeCadastro = async() => {
		try {
			await this.removeAll();
			await anexoOff.removeAll();
		} catch (error: any) {
			new ErrorOffline(
				'CadastroOff.removeCadastro',
				`Não foi possivel remover o cadastro: ${error.message}`
			)
		}
	}
}

export const cadastroOff = new CadastroOff();
