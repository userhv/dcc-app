import {StyleSheet} from 'react-native';

export const usuarioAutenticadoStyles = (colors: any) =>
  StyleSheet.create({
    boxInputDados: {
      flexDirection: 'column',
      marginBottom: 10,
    },
    inputDados: {
      flexGrow: 1,
      flexShrink: 1,
      padding: 10,
    },
    areaLogin: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 20,
      elevation: 1,
    },
  });
