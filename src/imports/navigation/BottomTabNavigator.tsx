import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import Modules from '../modules/index';
import { Home } from '../pages/Home/Home';
import { Route } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { bottomTabNavigatorIcon } from './bottonTabNavigatorIconStyle';
import { theme } from '../paper/theme';
import { IBottomTabParamList, IHomeParamList } from '../typings/NavigationTypings';
import { bottomTabNavigatorStyle } from './BottomTabNavigatorStyle';

interface INavigatorProps {
	user: any;
	route: Route<any>;
	navigation: NativeStackNavigationProp<any>;
}

interface IAppProps {
	user: any;
}


const BottomTab = createMaterialBottomTabNavigator<IBottomTabParamList>();

export const BottomTabNavigator = (appProps: IAppProps) => {
	return (
		<BottomTab.Navigator initialRouteName="Home" barStyle={bottomTabNavigatorStyle.style} screenOptions={{tabBarLabel: 'bold'}}>
			<BottomTab.Screen
				name="HomeScreen"
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ focused }) => <Icon name="home" size={24} color={focused ? theme.colors.azul : theme.colors.cinzaComOpacidade} />,
				}}>
				{(props) => <HomeNavigator {...props} {...appProps} />}
			</BottomTab.Screen>

			{Modules.getAppMenuItemList().map((menuData) => {
				return (
					<BottomTab.Screen
						key={menuData.navigatorName}
						name={menuData.navigatorName}
						component={getModuleNavigator(menuData.navigatorName)}
						options={{
							tabBarLabel: menuData.name,
							tabBarIcon: menuData.icon ?? bottomTabNavigatorIcon('folder'),
						}}
					/>

				);
			})}
		</BottomTab.Navigator>
		
	);
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createNativeStackNavigator<IHomeParamList>();

const HomeNavigator = (navigatorProps: INavigatorProps) => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false}} >
			<HomeStack.Screen name="Home" options={{ title: 'Seja bem vindo!' }}>
				{(props) => <Home {...props} {...navigatorProps} />}
			</HomeStack.Screen>
		</HomeStack.Navigator>
	);
};

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
