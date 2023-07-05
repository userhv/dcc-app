export enum TiposDisciplinas {
    GERAL = 'GERAL',
    TCC = 'TCC',
    TSI = 'TSI',
    TECC = 'TECC',
    TEI = 'Top. Esp. em Informática II'
}

type ITiposDisciplinas = {
	[key: string]: string;
};

export const rolesDisciplinas: ITiposDisciplinas = {
	[TiposDisciplinas.GERAL]: 'Obrigatórias & Optativas',
	[TiposDisciplinas.TCC]: 'Tópicos em Ciência da Computação',
	[TiposDisciplinas.TSI]: 'Tópicos em Sistemas de Informação',
	[TiposDisciplinas.TECC]: 'Tópicos Especiais em Ciência da Computação',
    [TiposDisciplinas.TEI]: 'Top. Esp. em Informática II'
};