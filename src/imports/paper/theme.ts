import {  MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fontConfig';

export const theme = {
	...DefaultTheme,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		primary: '#c90019',
		onPrimary: '#FFFFFF',
		primaryContainer: '#0668a8',
		onPrimaryContainer: '#650000',
		primaryOnHover: 'rgba(0, 126, 122, 0.1)',

		secondary: '#a7a9ac',
		onSecondary: '#650000',
		secondaryContainer: 'rgba(6, 104, 168,0.3)', //altera a cor da elipse da barra de navegação
		onSecondaryContainer: '#650000',
		secondaryOnHover: 'rgba(236, 177, 31, 0.2)',

		error: '#B30501',
		onError: '#FFFFFF',
		errorContainer: '#F7C0BF',
		onErrorContainer: '#B30501',

		background: '#FFFFFF',
		onBackground: '#404040',
		buttonOnHover: '#006B68',

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
		vermelhoEscuro: '#650000',
		vermelhoVivo: '#c90019',
		azul: '#0668a8',
		cinza: '#a7a9ac',
		cinzaComOpacidade: '#rgba(49, 49, 48,0.7)',
		cinzaClaro: '#dfe1e3',
		barraNavegacao: 'rgba(6, 104, 168,0.1)',
		azulClaro: '#4c85aa',
		branco: '#FFFFFF',
		azulComOpacidade: 'rgba(6, 104, 168,0.3)',
		azulOpacoMenuOportunidades: 'rgba(6, 104, 168,0.2)',
		cinzaEscuro: '#555555',
		quasePreto: '#2f2f2f',
		azulOpacoSelecionado: 'rgba(6, 104, 168,0.1)',

		//secundarias
		verdeEscuro: '#034944',
		aquaClaro: '#9DE4D6',
		azulEscuro: '#2626D1',
		amareloClaro: '#FFDD99',
		cerejaEscuro: '#991310',
		cerejaClaro: '#E191C5',
		cinzaMedio: '#BCBEC0',

		elevation: {
			level0: 'transparent',
			level1: '#f1faf1',
			level2: '#edf1ff',  //cor da bottom bar
			level3: '#e6f4e4',
			level4: '#e3f3e2',
			level5: '#dff1de'
		},
	}
 
};
