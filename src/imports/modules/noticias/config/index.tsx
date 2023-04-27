import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { NoticiasContainer } from '../pages/noticiasContainer';
import { NoticiasSalvas } from '../pages/noticiasSalvas';

export const noticiasRouterList = [
	{
		navigatorName: 'noticiasRoute',
		title: 'Detalhes da Noticia',
		name: 'NoticiasDetail',
		path: 'noticias/:screenState/:id',
		component: NoticiasContainer,
		isProtected: true
	},
	{
		navigatorName: 'noticiasRoute',
		title: 'Novo Exemplo',
		name: 'NoticiasCreate',
		path: 'noticias/:screenState',
		component: NoticiasContainer,
		isProtected: true
	},
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
		path: 'noticias/save',
		component: NoticiasSalvas,
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
