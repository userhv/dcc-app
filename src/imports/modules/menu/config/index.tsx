import React from 'react';
import { bottomTabNavigatorIcon } from '../../../navigation/bottonTabNavigatorIconStyle';
import { MenuContainer } from '../pages/menuContainer';
import { Sobre } from '../pages/subsecoes/Sobre';
import {  Professores } from '../pages/subsecoes/Professores';
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
		title: 'Professores',
		name: 'professores',
		path: 'professores',
		component: Professores,
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
		icon: bottomTabNavigatorIcon('menu')
	}
];

export default {
	menuRouterList,
	menuMenuItemList
};