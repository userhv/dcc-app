import { baseOfflineSch } from "../../../bd/baseOfflineSch";

export const anexoRealmSch = {
	email: {
		type: 'string',
		indexed: true
	},
	tipo: {
		type: 'string',
		indexed: true
	},
	...baseOfflineSch,
};
