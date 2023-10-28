import {StyleSheet} from 'react-native';

export const modalConfirmacaoStyle = (colors: any) => StyleSheet.create({
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
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    textAlign: 'auto',
    flexWrap: 'nowrap'
  },
  boxBotoes:{
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    paddingBottom: 10
  }
});
