import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './imports/paper/theme';
import { AppNavigation } from './imports/navigation/appNavigation';
import { GeneralComponents } from './imports/components/GeneralComponents/GeneralComponents';
import { deletarBancoInteiro, deletarBancoInteiroAgressivamente, inicializaRealmGlobal } from './InicializaRealm';
import NetInfo from '@react-native-community/netinfo';
import { NetInfoContext } from './imports/context/NetInfoContext';

export const App = () => {

  const [isInternetConnected, setIsInternetConnected] = useState<boolean | null>(null);

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
  
  return (
    <NetInfoContext.Provider value={isInternetConnected}>
      <PaperProvider theme={theme}>
        <GeneralComponents>
          <>
            <AppNavigation user={null}/>
          </>
        </GeneralComponents>
    </PaperProvider>
  </NetInfoContext.Provider>

  );
}

