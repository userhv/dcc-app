type LabelValue = {
	value: string | number;
	label: string;
};

export enum RoleType {
	ADMINISTRADOR = 'Administrador',
	ALUNO = 'Aluno',
	SERVIDOR = 'Servidor',
	PROFESSOR = 'Professor',
	PUBLICO = 'Publico',
}

type IRolesDicionario = {
	[key: string]: string;
};

export const rolesDicionario: IRolesDicionario = {
	[RoleType.ADMINISTRADOR]: 'Administrador',
	[RoleType.ALUNO]: 'Aluno',
	[RoleType.SERVIDOR]: 'Servidor',
	[RoleType.PROFESSOR]: 'Professor',
	[RoleType.PUBLICO]: 'Público',
};

export function obterListaRoles(): LabelValue[] {
	// @ts-ignore
	return Object.keys(rolesDicionario)
		.filter(chave => !!rolesDicionario[chave])
		.map(chave => ({
			value: chave,
			label: rolesDicionario[chave],
		}));
}
