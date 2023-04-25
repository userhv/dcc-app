import {IConnection} from './IConnection';
import {ISchema} from './ISchema';

export interface IContext {
	docId?: string;
	collection: string;
	action: string;
	user: any;
	rest?: any;
	connection?: IConnection;
	validador: any;
	schema: ISchema<any>;
	session: any;
}
