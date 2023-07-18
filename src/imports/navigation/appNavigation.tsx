import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BottomTabNavigator } from './BottomTabNavigator';
import { adaptNavigationTheme } from 'react-native-paper';
import { IAsyncStorageUser } from '../context/UserContext';
import { IUserProfile } from '../modules/userProfile/userProfileSch';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

interface IAppNavigation {
	user: IUserProfile | IAsyncStorageUser | null;
}

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });

export const AppNavigation = (props: IAppNavigation) => {
	const colorScheme = useColorScheme();
	const { user } = props;
	return (
		<SafeAreaProvider>
			<NavigationContainer key={'NavigatorDefault'} theme={colorScheme === 'dark' ? DarkTheme: LightTheme} >
				<BottomTabNavigator user={user}/>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};
