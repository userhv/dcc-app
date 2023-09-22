import {StyleSheet} from 'react-native';

export const oportunidadesCadastroStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    boxCentral: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
	  },
    boxInputDados:{
      flexDirection: 'column', 
      marginBottom: 10
    },
    inputDados:{
      flexGrow: 1, 
      flexShrink: 1, 
      padding: 10, 
      marginTop: 5, 
      borderRadius: 8,
      elevation: 1
    },
    areaUpload: {
      marginLeft: 10, 
      marginRight: 10, 
      marginBottom: 10
    },
    boxUpload:{
      borderRadius: 8, 
      elevation: 1, 
      marginTop: 10,
      flexDirection: 'row' ,
      alignItems: 'center', 
      justifyContent: 'space-between', 
      flexGrow: 1,
      flexShrink: 1 ,
    },
    boxBotoesUpload: {
      alignItems: 'center', 
      flexDirection: 'row', 
      paddingTop: 10
    }
  });
