import Realm from 'realm';
import { requestRealm } from './imports/libs/requestRealm';
import { noticiasOff as noticias } from './imports/modules/noticias/api/noticiasOff';
import { cadastroOff as cadastro } from './imports/modules/usuario/api/cadastroOff';
import { anexoOff as anexo } from './imports/modules/anexos/anexoOff';

const realmSchemas = [
	noticias.getSchema(),
	cadastro.getSchema(),
	anexo.getSchema(),
];

const realmSchemaNames = [ 'noticias'];

export const inicializaRealmGlobal = async () => {
	const realm = await Realm.open({
		schema: realmSchemas,
		deleteRealmIfMigrationNeeded: true,
		schemaVersion: 1
	});
	globalThis.realm = realm;
};

export const deletarBancoInteiroAgressivamente = async () => {
	const realm = requestRealm();
	realm.write(() => {
		realm.deleteAll();
	});
};

export const deletarBancoInteiro = async () => {
	const realm = requestRealm();
	realm.write(() => {
		realmSchemaNames.forEach((e) => realm.delete(realm.objects(`${e}Off`)));
	});
};
