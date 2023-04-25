/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './imports/paper/theme';
import { AppNavigation } from './imports/navigation/appNavigation';
import { GeneralComponents } from './imports/components/GeneralComponents/GeneralComponents';

export const App = () => {
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

