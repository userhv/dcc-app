import { IDoc } from '../../../../typings/IDoc';

export const cadastroSch = {
	idToken: {
		type: String,
		label: 'Token',
		defaultValue: '',
		optional: false
	},
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
	idToken: string | undefined;
	nome: string | undefined;
	email: string | undefined;
}
