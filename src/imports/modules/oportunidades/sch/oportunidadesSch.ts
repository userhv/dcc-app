import { IDoc } from '../../../typings/IDoc';

export const oportunidadesSch = {
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
	},
	content: {
		type: String,
		label: 'Conteúdo',
		defaultValue: '',
		optional: true
	}

};

export interface IOportunidade extends IDoc {
	url?: string;
	description: string;
	title: string;
	content: string;
	media?: {
		type: string,
		url: string;
	}[];

}
