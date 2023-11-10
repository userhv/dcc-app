import deviceInfoModule from 'react-native-device-info';

const carregaIdAparelho = async () => {
	const idAparelho = await deviceInfoModule.getAndroidId();

	console.log(idAparelho)
	globalThis.idAparelho = idAparelho;
};

carregaIdAparelho();
