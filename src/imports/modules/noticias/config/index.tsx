import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { NoticiasContainer } from '../pages/noticiasContainer';
import { NoticiasSalvas } from '../pages/noticiasSalvas';

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
	{
		navigatorName: 'noticiasRoute',
		title: 'Notícias Salvas',
		name: 'NoticiasSalvas',
		path: 'noticias/salvar',
		component: NoticiasSalvas,
		isProtected: true
	},
	{
		navigatorName: 'noticiasRoute',
		title: 'WebView',
		name: 'WebView',
		path: 'noticias/visualizar',
		component: NoticiasContainer,
		isProtected: true
	}
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