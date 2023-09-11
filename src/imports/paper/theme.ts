import {  MD3LightTheme as LightTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fontConfig';

export const theme = {
	...LightTheme,
	fonts: configureFonts({ config: fontConfig, isV3: true}),
	colors: {
		primary: '#c90019',
		onPrimary: '#FFFFFF',
		primaryContainer: 'rgb(101, 0, 0)',
		onPrimaryContainer: '#650000',
		primaryOnHover: 'rgba(0, 126, 122, 0.1)',

		secondary: '#a7a9ac',
		onSecondary: '#650000',
		onSecondaryContainer: '#650000',
		secondaryOnHover: 'rgba(236, 177, 31, 0.2)',

		error: '#B30501',
		onError: '#FFFFFF',
		errorContainer: '#F7C0BF',
		onErrorContainer: '#B30501',

		onBackground: '#404040',
		buttonOnHover: '#006B68',

		greenBackground: 'rgba(3, 73, 68, 0.85)',
		lightHover: 'rgba(255, 255, 255, 0.1)',
		surface: '#FFFFFF',
		onSurface: '#404040',
		surfaceVariant: '#DAE5E3',
		onSurfaceVariant: 'rgb(101, 0, 0)',
		outline: '#6F7978',
		elevation: {
			level0: 'transparent',
			level1: '#f1faf1',
			level2: '#edf1ff',  //cor da bottom bar
			level3: '#e6f4e4',
			level4: '#e3f3e2',
			level5: '#ebebeb'
		},

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
		vermelhoEscuro: 'rgb(101, 0, 0)',
		vermelhoVivo: 'rgb(201, 0, 25)',
		vermelhoVivoForte: 'rgb(255, 61, 58)',
		azul: '#0668a8',
		cinza: '#a7a9ac',
		cinzaComOpacidade: '#rgba(49, 49, 48,0.7)',
		cinzaClaro: '#dfe1e3',
		azulClaro: '#4c85aa',
		branco: '#FFFFFF',
		azulComOpacidade: 'rgba(6, 104, 168,0.3)',
		azulOpacoMenuOportunidades: 'rgba(6, 104, 168,0.2)',
		azulOpacoMenuOportunidadesDark: 'rgba(6, 104, 168,0.4)',
		cinzaEscuro: '#555555',
		quasePreto: '#2f2f2f',
		azulOpacoSelecionado: 'rgba(6, 104, 168,0.1)',
		vermelhoVivoOpaco: 'rgba(201, 0, 25, 0.1)',
		vermelhoVivoOpacoDark: 'rgba(199, 13, 13, 0.2)',

		//secundarias
		verdeEscuro: '#034944',
		verde: '#22851e',
		aquaClaro: '#9DE4D6',
		azulEscuro: '#1c1c7a',
		amareloClaro: '#FFDD99',
		laranja: '#d86a10',
		amarelo: '#a1981a',
		cinzaMedio: '#BCBEC0',
		quaseBranco: '#f3f3f3'
	},
 
};

export const accentColors = {
	accent: 'rgb(101, 0, 0)',
	accentClaro: 'rgb(201, 0, 25)',
	accentOpaco: 'rgba(201, 0, 25, 0.2)',
	accentOpacoDark: 'rgba(201, 0, 25,0.5)',
}

export const temaLight = {
		//cores dinamicas
		background: '#FFFFFF',
		barraNavegacao: '#FFFFFE',
		navegacaoAtiva: '#000000',
		secondaryContainer: 'rgba(201, 0, 25, 0.3)',
		navegacaoInativa: '#777777',
		iconeNavegacaoAtiva: '#000000',
		iconeNavegacaoInativa: '#777777',
		chipAtivado: 'rgb(101, 0, 0)',
		chipDesativado: 'rgba(153, 153, 153, 0.2)',
		divisorVertical: '#555555',
		cardDisciplinasTemaLight: 'rgba(201, 0, 0, 0.1)',
		corTextoChipAtivado: '#FFFFFF',
		corTextoChipDesativado: '#000000',
		corCardOportunidadeEstagio: '#d86a10',
		corCardOportunidadeIC: '#22851e',
};

export const temaDark = {
	//cores dinamicas
	background: '#131314',
	onSurface: theme.colors.cinza95, //usa a fonte titleMedium, bodyMedium, labelMedium, headlineSmall
	accent: 'rgba(101, 0, 0, 0.9)',
	barraNavegacao: '#1f1f1f',
	navegacaoAtiva: 'rgb(255, 255, 255)',
	secondaryContainer: 'rgba(201, 0, 25, 0.4)', //altera a cor da elipse da barra de navegação
	navegacaoInativa: 'rgb(172, 172, 172)',
	iconeNavegacaoAtiva: 'rgb(214, 214, 214)',
	iconeNavegacaoInativa: 'rgb(172, 172, 172)',
	chipAtivado: 'rgb(101, 0, 0)',
	chipDesativado: 'rgb(70, 70, 70)',
	divisorVertical: '#E6E7E8',
	corTextoChipAtivado: '#FFFFFF',
	corTextoChipDesativado: '#FFFFFF',
	corCardOportunidadeEstagio: '#d86a10',
	corCardOportunidadeIC: '#22851e',


};