import noticias from './noticias/config'
import menu from './menu/config'
import alunos from './alunos/config'

class Modules {
	modulesRouterList: (any | null)[] = [null];
	modulesAppMenuItemList: (any | null)[] = [null];
	constructor() {
		// Create modules router list
		this.modulesRouterList = [
			...noticias.noticiasRouterList,
			...alunos.alunosRouterList,
			...menu.menuRouterList,
		];

		// Create modules App Menu Item list
		this.modulesAppMenuItemList = [
			...noticias.noticiasMenuItemList,
			...alunos.alunosMenuItemList,
			...menu.menuMenuItemList,
		];
	}

	/**
	 * Retonar a rota de todos os módulos
	 * registrados na pasta modules
	 * @returns {Array}
	 */
	getListOfRouterModules = (navigatorName: string): Array<any> => {
		return navigatorName
			? this.modulesRouterList.filter((r) => r.navigatorName === navigatorName)
			: this.modulesRouterList;
	};

	/**
	 * Retorna todos os items de menu lateral para os módulos
	 * retistrados na pasta modules
	 * @returns {Array}
	 */
	getAppMenuItemList = (): Array<any> => {
		return this.modulesAppMenuItemList;
	};
}

export default new Modules();
