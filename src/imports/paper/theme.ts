import {  MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
	...DefaultTheme,
	// fonts: fontConfig,
	// fonts: configureFonts({ config: fontConfig }),

	colors: {
		primary: '#007E7A',
		onPrimary: '#FFFFFF',
		primaryContainer: '#9DE4D6',
		onPrimaryContainer: '#034944',
		primaryOnHover: 'rgba(0, 126, 122, 0.1)',

		secondary: '#ECB11F',
		onSecondary: '#034944',
		secondaryContainer: '#a7a9ac', //altera a cor da elipse da barra de navegação
		onSecondaryContainer: '#034944',
		secondaryOnHover: 'rgba(236, 177, 31, 0.2)',

		error: '#B30501',
		onError: '#FFFFFF',
		errorContainer: '#F7C0BF',
		onErrorContainer: '#B30501',

		background: '#FFFFFF',
		onBackground: '#404040',
		buttonOnHover: '#006B68',

		// acredito que não funcione, para o gradiente funcionar tem-se usado o componnete <LinearGradient> que vem da lib  import LinearGradient from 'react-native-linear-gradient';
		primaryGradient: 'linear-gradient(180deg, #0ABB98 0%, #08AE92 45.83%, #06A28B 69.27%, #007E7A 100%);',
		secondaryGradient: 'linear-gradient(180deg, #034944 0%, #007E7A 100%)',

		greenBackground: 'rgba(3, 73, 68, 0.85)',
		lightHover: 'rgba(255, 255, 255, 0.1)',
		surface: '#FFFFFF',
		onSurface: '#404040',
		surfaceVariant: '#DAE5E3',
		onSurfaceVariant: '#303030',
		outline: '#6F7978',

		//cinzas
		preto: '#000000',
		cinza10: '#1C1C1C',
		cinza20: '#282828',
		cinza30: '#404040',
		cinza40: '#555555',
		cinza50: '#777777',
		cinza60: '#909090',
		cinza70: '#ACACAC',
		cinza80: '#BCBEC0',
		cinza90: '#E6E7E8',
		cinza95: '#EFF1F0',
		cinza98: '#F7FBF9',

		//primarias
		aquaVale: '#0ABB98',
		amareloVale: '#ECB11F',
		cerejaVale: '#C0305E',
		laranjaVale: '#E37222',
		azulVale: '#3CB5E5',
		cinzaEscuro: '#555555',
		branco: '#FFFFFF',
		verdeVale: '#007E7A',

		//secundarias
		verdeEscuro: '#034944',
		aquaClaro: '#9DE4D6',
		azulEscuro: '#2626D1',
		amareloClaro: '#FFDD99',
		cerejaEscuro: '#991310',
		cerejaClaro: '#E191C5',
		// cinzaClaro: '#E6E7E8',
		cinzaMedio: '#BCBEC0',

		vermelhoEscuro: '#650000',
		vermelhoVivo: '#c90019',
		azul: '#0668a8',
		cinza: '#a7a9ac',
		cinzaClaro: '#dfe1e3',
		azulClaro: '#4c85aa',

		elevation: {
			level0: 'transparent',
			level1: '#f1faf1',
			level2: '#eaf7ea',
			level3: '#e6f4e4',
			level4: '#e3f3e2',
			level5: '#dff1de'
		},
	}
};
