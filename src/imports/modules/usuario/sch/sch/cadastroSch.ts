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

};

export interface ICadastro extends IDoc {
	nome: string | undefined;
	email: string | undefined;
}
