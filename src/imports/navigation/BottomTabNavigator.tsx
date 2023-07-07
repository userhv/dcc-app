import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Modules from '../modules/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { bottomTabNavigatorIcon } from './bottonTabNavigatorIconStyle';
import { theme } from '../paper/theme';
import { IBottomTabParamList } from '../typings/NavigationTypings';

interface IAppProps {
	user: any;
}

const BottomTab = createMaterialBottomTabNavigator<IBottomTabParamList>();

export const BottomTabNavigator = (appProps: IAppProps) => {
	const { user } = appProps;

	return (
		<BottomTab.Navigator initialRouteName="Noticias"  activeColor={theme.colors.preto} inactiveColor={theme.colors.cinza50}>
			{Modules.getAppMenuItemList().map((menuData) => {
				return (
					<BottomTab.Screen
						key={menuData.navigatorName}
						name={menuData.navigatorName}
						component={getModuleNavigator(menuData.navigatorName)}
						options={{
							tabBarLabel: menuData.name,
							tabBarIcon: menuData.icon ?? bottomTabNavigatorIcon('folder-outline'),
						}}
					/>

				);
			})}
		</BottomTab.Navigator>
		
	);
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const getModuleNavigator = (navigatorName: string) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	const InitialRouter = Modules.getListOfRouterModules(navigatorName).find((r) => r.isInitialRoute);

	return (...params: Object[]) => {
		return (
			<Navigator
				initialRouteName={InitialRouter ? InitialRouter.name : navigatorName}
				screenOptions={{ headerShown: false }}>
				{Modules.getListOfRouterModules(navigatorName).map((routerData) => {
					const ScreenComponent = routerData.component;
					return (
						<Screen key={routerData.name} name={routerData.name} options={{ title: routerData.title }}>
							{(props) => <ScreenComponent {...params} {...props} />}
						</Screen>
					);
				})}
			</Navigator>
		);
	};
};
