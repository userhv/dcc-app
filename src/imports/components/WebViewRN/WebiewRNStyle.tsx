import { StyleSheet } from "react-native";
import { theme } from "../../paper/theme";

export const webViewRNStyle = StyleSheet.create({
  containerComponente: {
    flex: 1,
  },
  
  containerSuperior: {
    backgroundColor: theme.colors.cinzaEscuro,
    flexDirection: 'row',
    paddingTop: 10
  },

  containerBotaoFechar: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerTitulo: {
    width: 360,
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    flexShrink: 1
  },
  
  texto: {
    color: theme.colors.branco,
    flexShrink: 1,
  },

  botaoFechar: {
    justifyContent: 'center',
    margin: 10,
  },

    container: {
      flex: 1,  
    },
  });