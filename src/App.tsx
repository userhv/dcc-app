import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { temaDark, temaLight, theme } from './imports/paper/theme';
import { AppNavigation } from './imports/navigation/appNavigation';
import { GeneralComponents } from './imports/components/GeneralComponents/GeneralComponents';
import { deletarBancoInteiro, deletarBancoInteiroAgressivamente, inicializaRealmGlobal } from './InicializaRealm';
import NetInfo from '@react-native-community/netinfo';
import { NetInfoContext } from './imports/context/NetInfoContext';
import { useColorScheme } from 'react-native';

export const App = () => {

  const [isInternetConnected, setIsInternetConnected] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();

	const unsubscribe = NetInfo.addEventListener((state) => {
		if (state.isConnected !== isInternetConnected) {
			setIsInternetConnected(state.isConnected);
		}
	});


  useEffect(() => {
		const inicializaRealm = async () => {
			await inicializaRealmGlobal();
			// await deletarBancoInteiro();
			// await deletarBancoInteiroAgressivamente();
		};
		inicializaRealm();
    return () => {
      unsubscribe();
    }
    
	}, []);

  const themeDefault = {
    ...theme,
    colors: 
      colorScheme === 'dark' ? {...theme.colors, ...temaDark } : {...theme.colors, ...temaLight } 
  }

  
  return (
    <NetInfoContext.Provider value={isInternetConnected}>
      <PaperProvider theme={themeDefault}>
        <GeneralComponents>
            <AppNavigation user={null}/>
        </GeneralComponents>
    </PaperProvider>
  </NetInfoContext.Provider>

  );
}

