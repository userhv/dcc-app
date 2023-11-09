import {StyleSheet} from 'react-native';

export const modalAutenticacaoStyle = (colors: any) => StyleSheet.create({
  container: {
    margin: 20,
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
  },
  form:{
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 16
},
labelForm: {
    paddingTop: 10,
    paddingBottom: 10
},
});
