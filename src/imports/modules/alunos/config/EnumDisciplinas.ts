export enum TiposDisciplinas {
    GERAL = 'GERAL',
    TCC = 'TCC',
    TSI = 'TSI',
    TECC = 'TECC',
}

type ITiposDisciplinas = {
	[key: string]: string;
};

export const rolesDisciplinas: ITiposDisciplinas = {
	[TiposDisciplinas.GERAL]: 'Obrigatórias & Optativas',
	[TiposDisciplinas.TCC]: 'Tópicos em Ciência da Computação',
	[TiposDisciplinas.TSI]: 'Tópicos em Sistemas de Informação',
	[TiposDisciplinas.TECC]: 'Tópicos Especiais em Ciência da Computação',
};