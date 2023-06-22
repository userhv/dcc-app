import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './imports/paper/theme';
import { AppNavigation } from './imports/navigation/appNavigation';
import { GeneralComponents } from './imports/components/GeneralComponents/GeneralComponents';
import { deletarBancoInteiro, deletarBancoInteiroAgressivamente, inicializaRealmGlobal } from './InicializaRealm';

export const App = () => {
  
  useEffect(() => {
		const inicializaRealm = async () => {
			await inicializaRealmGlobal();
			// await deletarBancoInteiro();
			// await deletarBancoInteiroAgressivamente();
		};
		inicializaRealm();
    
	}, []);
  
  return (
    <PaperProvider theme={theme}>
      <GeneralComponents>
        <>
        <AppNavigation user={null}/>
        </>
      </GeneralComponents>
  </PaperProvider>

  );
}

