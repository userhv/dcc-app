import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const modalVersaoStyle = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: theme.colors.branco,
    borderRadius: 16,
  },
  boxTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  texto: {
    paddingTop: 10, 
    paddingLeft: 10
  },
  boxTexto:{
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    textAlign: 'auto',
    flexWrap: 'nowrap'
  }
});
