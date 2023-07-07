import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BottomTabNavigator } from './BottomTabNavigator';
import { adaptNavigationTheme } from 'react-native-paper';
import { IAsyncStorageUser } from '../context/UserContext';
import { IUserProfile } from '../modules/userProfile/userProfileSch';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface IAppNavigation {
	user: IUserProfile | IAsyncStorageUser | null;
}

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export const AppNavigation = (props: IAppNavigation) => {
	const { user } = props;
	return (
		<SafeAreaProvider>
			<NavigationContainer key={'NavigatorDefault'} theme={LightTheme} >
				<BottomTabNavigator user={user}/>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};
