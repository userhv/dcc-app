import React from 'react';
import { AlunoContainer } from '../pages/alunoContainer';
import {  Professores } from '../pages/subsecoes/Professores';
import { Disciplinas } from '../pages/subsecoes/Disciplinas';

export const alunosRouterList = [
	{
		isInitialRoute: true,
		navigatorName: 'alunosRoute',
		title: 'Alunos',
		name: 'alunos',
		path: 'alunos',
		component: AlunoContainer,
		isProtected: true
	},
	{
		navigatorName: 'alunosRoute',
		title: 'Professores',
		name: 'professores',
		path: 'professores',
		component: Professores,
		isProtected: true
	},
	{
		navigatorName: 'alunosRoute',
		title: 'Disciplinas',
		name: 'disciplinas',
		path: 'disciplinas',
		component: Disciplinas,
		isProtected: true
	},
	{
		navigatorName: 'alunosRoute',
		title: 'Disciplinas por semestre',
		name: 'disciplinasSemestre',
		path: 'disciplinas/semestre',
		component: AlunoContainer,
		isProtected: true
	},
];

export const alunosMenuItemList = [
	{
		navigatorName: 'alunosRoute',
		name: 'Para o aluno',
		icon: 'book-education-outline'
	}
];

export default {
	alunosRouterList,
	alunosMenuItemList
};