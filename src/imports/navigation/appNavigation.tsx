import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ScreenTabRoot } from './TabNavigation';
import { adaptNavigationTheme } from 'react-native-paper';
import { IAsyncStorageUser } from '../context/UserContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

interface IAppNavigation {
	user:  IAsyncStorageUser | null;
}

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });

export const AppNavigation = (props: IAppNavigation) => {
	const colorScheme = useColorScheme();
	const { user } = props;

	return (
		<SafeAreaProvider>
			<NavigationContainer key={'NavigatorDefault'} theme={colorScheme === 'dark' ? DarkTheme: LightTheme} >
				<ScreenTabRoot user={user}/>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};
