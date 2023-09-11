import { StyleSheet } from "react-native";

export const webViewRNStyle = (colors:any) => StyleSheet.create({
  containerComponente: {
    flex: 1,
  },
  
  containerSuperior: {
    backgroundColor: colors.quasePreto,
    flexDirection: 'row',
    paddingTop: 10,
  },

  containerBotaoFechar: {
    alignItems: 'center',
  },

  containerTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    maxWidth: 320,
    flex: 1,
    flexShrink: 1,
  },
  containerCompartilhar: {
    justifyContent: 'flex-end', 
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },

  texto: {
    color: colors.branco,
    flexShrink: 1,
  },

  botaoFechar: {
    justifyContent: 'center',
  },

  container: {
    flex: 1,  
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%'
  }
  });