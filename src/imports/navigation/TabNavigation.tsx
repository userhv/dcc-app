import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IBottomTabParamList } from '../typings/NavigationTypings';
import { useTheme } from 'react-native-paper';
import { varianteSemOutline } from '../libs/removerVarianteOutline';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NoticiasContainer } from '../modules/noticias/pages/noticiasContainer';
import { WebViewRN } from '../components/WebViewRN/WebViewRN';
import { AlunoContainer } from '../modules/alunos/pages/alunoContainer';
import { MenuContainer } from '../modules/menu/pages/menuContainer';

interface IAppProps {
	user: any;
}

const BottomTab = createMaterialBottomTabNavigator<IBottomTabParamList>();
const WebViewBottomTab = createMaterialBottomTabNavigator();
const ScreensTabNative = createNativeStackNavigator();
const ScreenRoot = createNativeStackNavigator();

const bottomTabNavigatorIcon = (name: string, colors: {[key:string]: any}) => {
	const variante = varianteSemOutline(name);
	return ({ focused }: { focused: boolean }) => <Icon name={focused ? variante : name} 
			size={24} color={focused ? colors.iconeNavegacaoAtiva : colors.iconeNavegacaoInativa} />;
};

export const ScreenTabRoot = (appProps: IAppProps) =>{
	const {user } = appProps;
	return(
		<ScreenRoot.Navigator screenOptions={{ headerShown: false }} initialRouteName='BottomTab'>
			<ScreenRoot.Screen name='Root' component={ScreensTab} initialParams={{user:user}}/> 
		</ScreenRoot.Navigator>
	)
}

const ScreensTab = (propsNavegacao: any) => {
	const user = propsNavegacao.route.params.user;

	return(
		<ScreensTabNative.Navigator screenOptions={{ headerShown: false }} initialRouteName='BottomTab'>
			<ScreensTabNative.Screen name='BottomTab' component={BottomTabNavigator} /> 
			<ScreensTabNative.Screen name='WebView' component={WebViewBottom}/>
		</ScreensTabNative.Navigator>
	)
}

const BottomTabNavigator = (propsNavegacao: any) => {
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;

	return (
			<BottomTab.Navigator initialRouteName="NoticiasTab" activeColor={colors.navegacaoAtiva} inactiveColor={colors.navegacaoInativa}
				barStyle={{backgroundColor: colors.barraNavegacao }}>

				<BottomTab.Screen
						key={'noticiasRoute'}
						name={'NoticiasTab'}
						component={NoticiasContainer}
						options={{
							tabBarLabel: 'Noticias',
							tabBarIcon: bottomTabNavigatorIcon('newspaper-variant-outline', colors)
						}}
					/>

				<BottomTab.Screen
						key={'alunosRoute'}
						name={'AlunosTab'}
						component={AlunoContainer}
						options={{
							tabBarLabel: 'Para o aluno',
							tabBarIcon: bottomTabNavigatorIcon('book-education-outline', colors)
						}}
					/>

				<BottomTab.Screen
						key={'menuRoute'}
						name={'MenuTab'}
						component={MenuContainer}
						options={{
							tabBarLabel: 'Menu',
							tabBarIcon: bottomTabNavigatorIcon('menu', colors)
						}}
					/>
			</BottomTab.Navigator>
			
	);
};

const WebViewBottom = (propsNavegacao: any) => {
	const url = propsNavegacao.route.params.url;
	return(
		<WebViewBottomTab.Navigator initialRouteName='WebViewTab' barStyle={{display: 'none'}}>
			<WebViewBottomTab.Screen 
				key='WebViewTab'
				name='WebViewTab'
				component={WebViewRN}
				initialParams={{url: url}}/>
	</WebViewBottomTab.Navigator>
	)
}
