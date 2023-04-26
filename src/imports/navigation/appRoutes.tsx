import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Route } from '@react-navigation/native';
import Modules from '../modules/index';
import { NoticiasContainer } from '../modules/noticias/pages/noticiasContainer';
import { IUserProfile } from '../modules/userProfile/userProfileSch';

interface IAppProps {
	user: IUserProfile;
}

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = (appProps: IAppProps) => {
	return (
		<Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<Screen name="HomeScreen">{(props) => <HomeNavigator {...props} {...appProps} />}</Screen>

			{Modules.getAppMenuItemList().map((menuData) => {
				return (
					<Screen
						key={menuData.navigatorName}
						name={menuData.navigatorName}
						component={getModuleNavigator(menuData.navigatorName, menuData.screenOptionsConfig)}
					/>
				);
			})}
		</Navigator>
	);
};

interface INavigatorProps {
	user: IUserProfile;
	route: Route<any>;
	navigation: NativeStackNavigationProp<any>;
}

const HomeNavigator = (navigatorProps: INavigatorProps) => {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="Home" options={{ title: 'Seja bem vindo!' }}>
				{(props) => <NoticiasContainer {...props} {...navigatorProps} />}
			</Screen>
		</Navigator>
	);
};


const getModuleNavigator = (navigatorName: string, screenOptionsConfig: object) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	const InitialRouter = Modules.getListOfRouterModules(navigatorName).find((r) => r.isInitialRoute);
	const hasScreenOptionsConfig = screenOptionsConfig && Object.keys(screenOptionsConfig).length > 0;

	return (...params: Object[]) => {
		return (
			<Navigator
				initialRouteName={InitialRouter ? InitialRouter.name : navigatorName}
				screenOptions={hasScreenOptionsConfig ? { ...screenOptionsConfig } : { headerShown: true }}>
				{Modules.getListOfRouterModules(navigatorName).map((routerData) => {
					const ScreenComponent = routerData.component;
					return (
						<Screen
							key={routerData.name}
							name={routerData.name}
							options={{ title: routerData.title, headerStyle: routerData.headerStyle }}>
							{(props) => <ScreenComponent {...params} {...props} />}
						</Screen>
					);
				})}
			</Navigator>
		);
	};
};
