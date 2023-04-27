import { IDoc } from '../../../typings/IDoc';

export const noticiasSch = {
	url: {
		type: String,
		label: 'url',
		defaultValue: '',
		optional: true
	},
	description: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: false
	},
	title: {
		type: String,
		label: 'Titulo',
		defaultValue: '',
		optional: false
	},

};

export interface INoticias extends IDoc {
	url: string;
	description: string;
	title: string;

}
