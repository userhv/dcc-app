import React from 'react';
import { MenuContainer } from '../pages/menuContainer';
import { Sobre } from '../pages/subsecoes/Sobre';
import { Contatos } from '../pages/subsecoes/Contatos';

export const menuRouterList = [
	{
		isInitialRoute: true,
		navigatorName: 'menuRoute',
		title: 'Menu',
		name: 'menu',
		path: 'menu',
		component: MenuContainer,
		isProtected: true
	},
	{
		navigatorName: 'menuRoute',
		title: 'Sobre',
		name: 'sobre',
		path: 'sobre',
		component: Sobre,
		isProtected: true
	},
	{
		navigatorName: 'menuRoute',
		title: 'Fale Conosco',
		name: 'feedback',
		path: 'feedback',
		component: Contatos,
		isProtected: true
	}
];

export const menuMenuItemList = [
	{
		navigatorName: 'menuRoute',
		name: 'Menu',
		icon: 'menu'
	}
];

export default {
	menuRouterList,
	menuMenuItemList
};