import {StyleSheet} from 'react-native';

export const loginStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    textoAnexo: {
      paddingBottom: 10,
      flexGrow: 1,
    },
    boxCentral: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxBotoesSalvar: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
    },
    boxRemoverConta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
      },
  });
