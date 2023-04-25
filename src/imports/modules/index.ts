import noticias from './noticias/config'

class Modules {
	modulesRouterList: (any | null)[] = [null];
	modulesAppMenuItemList: (any | null)[] = [null];
	constructor() {
		// Create modules router list
		this.modulesRouterList = [
			...noticias.noticiasRouterList,
		];

		// Create modules App Menu Item list
		this.modulesAppMenuItemList = [
			...noticias.noticiasMenuItemList,
		];
	}

	/**
	 * Retonar a rota de todos os módulos
	 * registrados na pasta modules
	 * @returns {Array}
	 */
	getListOfRouterModules = (navigatorName) => {
		return navigatorName
			? this.modulesRouterList.filter((r) => r.navigatorName === navigatorName)
			: this.modulesRouterList;
	};

	/**
	 * Retorna todos os items de menu lateral para os módulos
	 * retistrados na pasta modules
	 * @returns {Array}
	 */
	getAppMenuItemList = () => {
		return this.modulesAppMenuItemList;
	};
}

export default new Modules();
