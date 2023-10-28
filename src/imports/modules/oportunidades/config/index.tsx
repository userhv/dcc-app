import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { OportunidadesContainer } from '../pages/oportunidadesContainer';
import { OportunidadesSalvas } from '../pages/oportunidadesSalvas';
import { OportunidadeEvento } from '../pages/subpages/OportundadeEvento';

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
	{
		navigatorName: 'oportunidadesRoute',
		title: 'Oportunidade Evento',
		name: 'OportunidadesEventos',
		path: 'oportunidades/eventos',
		component: OportunidadesContainer,
		isProtected: true
	},
	{
		navigatorName: 'oportunidadesRoute',
		title: 'Oportunidade Palestra',
		name: 'OportunidadesPalestras',
		path: 'oportunidades/palesras',
		component: OportunidadesContainer,
		isProtected: true
	},
	{
		navigatorName: 'oportunidadesRoute',
		title: 'Oportunidade ICS',
		name: 'OportunidadesIcs',
		path: 'oportunidades/ics',
		component: OportunidadesContainer,
		isProtected: true
	},
	{
		navigatorName: 'oportunidadesRoute',
		title: 'Oportunidade Estagios',
		name: 'OportunidadesEstagios',
		path: 'oportunidades/estagios',
		component: OportunidadesContainer,
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
