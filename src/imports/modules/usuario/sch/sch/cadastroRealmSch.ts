import { baseOfflineSch } from '../../../../../bd/baseOfflineSch';

export const cadastroRealmSch = {
	email: {
		type: 'string',
		indexed: true
	},
	...baseOfflineSch,
};
