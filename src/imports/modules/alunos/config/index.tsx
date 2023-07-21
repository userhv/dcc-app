import React from 'react';
import { AlunoContainer } from '../pages/alunoContainer';
import {  Professores } from '../pages/subsecoes/Professores';
import { OfertasDisciplinas } from '../pages/subsecoes/OfertasDisciplinas';

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
		title: 'Ofertas de Disciplinas',
		name: 'ofertas',
		path: 'ofertas',
		component: OfertasDisciplinas,
		isProtected: true
	},
	{
		navigatorName: 'alunosRoute',
		title: 'Disciplinas por semestre',
		name: 'disciplinasSemestre',
		path: 'ofertas/semestre',
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