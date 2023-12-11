import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { accentColors, temaDark, temaLight, theme } from './imports/paper/theme';
import { AppNavigation } from './imports/navigation/appNavigation';
import { GeneralComponents } from './imports/components/GeneralComponents/GeneralComponents';
import { deletarBancoInteiro, deletarBancoInteiroAgressivamente, inicializaRealmGlobal } from './InicializaRealm';
import NetInfo from '@react-native-community/netinfo';
import { NetInfoContext } from './imports/context/NetInfoContext';
import { useColorScheme } from 'react-native';
import { IAsyncStorageUser, UserContext } from './imports/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_ASYNC_COLLECTION } from './imports/config/storageConfig';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const getData = async (callback: any) => {
	try {
		const asyncStorageUser = await AsyncStorage.getItem(USER_ASYNC_COLLECTION);
		!!asyncStorageUser && callback(null, JSON.parse(asyncStorageUser));
	} catch (err) {
		callback(err, null);
	}
};

const clearAll = async (callback: any) => {
	try {
		await AsyncStorage.clear();
		callback(null, null);
	} catch (err) {
		console.log('error.clearUser', err);
	}
};

export const App = () => {

  const [isInternetConnected, setIsInternetConnected] = useState<boolean | null>(null);
  const [user, setUser] = useState<IAsyncStorageUser | null>(null);
  const colorScheme = useColorScheme();
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

	const unsubscribe = NetInfo.addEventListener((state) => {
		if (state.isConnected !== isInternetConnected) {
			setIsInternetConnected(state.isConnected);
		}
	});
  

messaging().onMessage(async remoteMessage => {
  console.log('Message received!', remoteMessage);
});
  
  useEffect(() => {
		const inicializaRealm = async () => {
			await inicializaRealmGlobal();
		};
    const registerForPushNotifications = async()=> {
      const token = await messaging().getToken();
      console.log('Push notification token:', token);
    }
    registerForPushNotifications();

    getData((e: any, r: any) => setUser(r));
		inicializaRealm();
    return () => {
      unsubscribe();
    }
    
	}, []);

  const themeDefault = {
    ...theme,
    colors: 
      colorScheme === 'dark' ? {...theme.colors, ...accentColors, ...temaDark} : {...theme.colors, ...accentColors , ...temaLight } 
  }

  
  return (
    <UserContext.Provider value={{ asyncStorageUser: user, setAsyncStorageUser: setUser }}>
      <NetInfoContext.Provider value={isInternetConnected}>
        <PaperProvider theme={themeDefault}>
          <GeneralComponents>
              <AppNavigation user={user}/>
          </GeneralComponents>
      </PaperProvider>
    </NetInfoContext.Provider>
   </UserContext.Provider>

  );
}

