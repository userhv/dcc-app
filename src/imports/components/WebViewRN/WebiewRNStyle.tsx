import { StyleSheet } from "react-native";
import { theme } from "../../paper/theme";

export const webViewRNStyle = StyleSheet.create({
  containerComponente: {
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.branco
  },
  
  containerSuperior: {
    height: '6%', 
    backgroundColor: theme.colors.cinzaEscuro,
    flexDirection: 'row',
    zIndex: 1
  },

  containerBotaoFechar: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerTitulo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    flexShrink: 1
  },
  
  texto: {
    color: theme.colors.branco,
    flexShrink: 1,
  },

  botaoFechar: {
    alignItems: 'center', 
    justifyContent: 'center',
  },

    container: {
      flex: 1,  
    },
  });