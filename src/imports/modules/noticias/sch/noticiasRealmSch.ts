import { baseOfflineSch } from '../../../../bd/baseOfflineSch';

export const noticiasRealmSch = {
	...baseOfflineSch,
	url: {
		type: 'string',
		indexed: true
	},
};
