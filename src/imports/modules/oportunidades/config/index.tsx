import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { OportunidadesContainer } from '../pages/oportunidadesContainer';
import { OportunidadesSalvas } from '../pages/oportunidadesSalvas';

export const oportunidadesRouterList = [
	{
		navigatorName: 'oportunidadesRoute',
		title: 'Detalhes das Oportunidades',
		name: 'OportunidadesDetail',
		path: 'oportunidades/:screenState/:id',
		component: OportunidadesContainer,
		isProtected: true
	},
	{
		isInitialRoute: true,
		navigatorName: 'oportunidadesRoute',
		title: 'Lista de Lista de Oportunidades',
		name: 'Oportunidades',
		path: 'oportunidades',
		component: OportunidadesContainer,
		isProtected: true
	},
	{
		navigatorName: 'oportunidadesRoute',
		title: 'Oportunidades Salvas',
		name: 'OportunidadesSalvas',
		path: 'oportunidades/save',
		component: OportunidadesSalvas,
		isProtected: true
	},

];

export const oportunidadesMenuItemList = [
	{
		navigatorName: 'oportunidadesRoute',
		name: 'Oportunidades',
		icon: bottomTabNavigatorIcon('lightbulb-on-outline')
	}
];

export default {
	oportunidadesRouterList,
	oportunidadesMenuItemList
};
