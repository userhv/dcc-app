import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { NoticiasContainer } from '../pages/noticiasContainer';

export const noticiasRouterList = [
	{
		navigatorName: 'noticiasRoute',
		title: 'Detalhes da Noticia',
		name: 'NoticiasDetail',
		path: 'Noticias/:screenState/:id',
		component: NoticiasContainer,
		isProtected: true
	},
	{
		navigatorName: 'noticiasRoute',
		title: 'Novo Exemplo',
		name: 'NoticiasCreate',
		path: 'Noticias/:screenState',
		component: NoticiasContainer,
		isProtected: true
	},
	{
		isInitialRoute: true,
		navigatorName: 'noticiasRoute',
		title: 'Lista de Noticias',
		name: 'Noticias',
		path: 'Noticias',
		component: NoticiasContainer,
		isProtected: true
	},

];

export const noticiasMenuItemList = [
	{
		navigatorName: 'noticiasRoute',
		name: 'Notícias',
		icon: bottomTabNavigatorIcon('newspaper')
	}
];

export default {
	noticiasRouterList,
	noticiasMenuItemList
};
