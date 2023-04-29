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
	media: {
		type: [Object],
		label: 'Media',
		defaultValue: '',
		optional: true
	}

};

export interface INoticias extends IDoc {
	url: string;
	description: string;
	title: string;
	media: {
		type: string,
		url: string;
	}[];

}
