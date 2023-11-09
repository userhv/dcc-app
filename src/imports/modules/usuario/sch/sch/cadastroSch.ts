import { IDoc } from '../../../../typings/IDoc';

export const cadastroSch = {
	nome: {
		type: String,
		label: 'Nome',
		defaultValue: '',
		optional: false
	},
	email: {
		type: String,
		label: 'Email',
		defaultValue: '',
		optional: false
	},
	uid: {
		type: String,
		label: 'UID',
		defaultValue: '',
		optional: false
	},
	titulo: {
		type: String,
		label: 'Titulo',
		defaultValue: '',
		optional: false
	},
	

};

export interface ICadastro extends IDoc {
	nome: string;
	email: string;
	uid: string;
	titulo: string;
}
