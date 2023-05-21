import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { NoticiasContainer } from '../pages/noticiasContainer';

export const noticiasRouterList = [
	{
		isInitialRoute: true,
		navigatorName: 'noticiasRoute',
		title: 'Lista de Noticias',
		name: 'Noticias',
		path: 'noticias',
		component: NoticiasContainer,
		isProtected: true
	},
];

export const noticiasMenuItemList = [
	{
		navigatorName: 'noticiasRoute',
		name: 'Notícias',
		icon: bottomTabNavigatorIcon('newspaper-variant-outline')
	}
];

export default {
	noticiasRouterList,
	noticiasMenuItemList
};