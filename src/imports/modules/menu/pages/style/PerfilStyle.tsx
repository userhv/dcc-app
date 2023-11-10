import {StyleSheet} from 'react-native';

export const perfilStyle = (colors: any) =>
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
    areaUpload: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 50,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 20,
      elevation: 1,
    },
    boxBotoesSalvar: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
    },
  });
