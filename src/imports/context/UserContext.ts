import { createContext, Dispatch, SetStateAction } from 'react';


type IRolesTitulo = {
	[key: string]: string;
};

export const tituloDicionario: IRolesTitulo = {
	['gradcc']: 'Ciência da Computação',
	['gradsi']: 'Sistemas de Informação',
	['gradmc']: 'Matemática Computacional',
	['gradcd']: 'Ciência de Dados',
	['bioinfo']: 'Bioinformática',
	['pos']: 'Pós-Graduaçãol',
	['prof']: 'Professor',
	['func']: 'Funcionário',
	['alunotemp']: 'Temporário',
	['vip']: 'Outro',
};

export interface IAsyncStorageUser {
	_id: string;
	nome: string;
	email: string;
	uid: string;
	titulo: string;
}

export interface IUserContext {
	asyncStorageUser: IAsyncStorageUser | null;
	setAsyncStorageUser: Dispatch<SetStateAction<IAsyncStorageUser | null>>;
}

export const UserContext = createContext<IUserContext | null>({
	asyncStorageUser: null,
	setAsyncStorageUser: () => {}
});
