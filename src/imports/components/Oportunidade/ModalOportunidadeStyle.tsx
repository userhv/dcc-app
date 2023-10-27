import {StyleSheet} from 'react-native';

export const modalOportunidadeStyle = (colors: any) => StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 16,
  },
  boxTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  texto: {
    paddingTop: 10, 
    paddingLeft: 10,
    paddingBottom: 10
  },
  boxTexto:{
    backgroundColor: colors.cinza40,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    padding: 10,
    textAlign: 'auto',
    flexWrap: 'nowrap'
  },
  boxBotoes:{
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingBottom: 10
  },
  boxInputDados: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  inputDados: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
});
