import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Modules from '../modules/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IBottomTabParamList } from '../typings/NavigationTypings';
import { useTheme } from 'react-native-paper';
import { varianteSemOutline } from '../libs/removerVarianteOutline';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IAppProps {
	user: any;
}

const bottomTabNavigatorIcon = (name: string, colors: {[key:string]: any}) => {
	const variante = varianteSemOutline(name);
	return ({ focused }: { focused: boolean }) => <Icon name={focused ? variante : name} 
			size={24} color={focused ? colors.iconeNavegacaoAtiva : colors.iconeNavegacaoInativa} />;
};


const BottomTab = createMaterialBottomTabNavigator<IBottomTabParamList>();

export const BottomTabNavigator = (appProps: IAppProps) => {
	const { user } = appProps;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;

	return (
		<BottomTab.Navigator initialRouteName="Noticias"  activeColor={colors.navegacaoAtiva} inactiveColor={colors.navegacaoInativa}
			barStyle={{backgroundColor: colors.barraNavegacao}}>
			{Modules.getAppMenuItemList().map((menuData) => {
				return (
					<BottomTab.Screen
						key={menuData.navigatorName}
						name={menuData.navigatorName}
						component={getModuleNavigator(menuData.navigatorName)}
						options={{
							tabBarLabel: menuData.name,
							tabBarIcon: bottomTabNavigatorIcon(menuData.icon, colors)
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
