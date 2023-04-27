import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasSalvasRNStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerTop: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.branco,
    
  },

  icone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    paddingLeft: 7
  },

  descricao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },

  boxIconeVazio: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  texto: {
    flexWrap: 'wrap',
    width: '90%',
    textAlign: 'center'
  },
  
  divisor: {
    backgroundColor: theme.colors.cinzaMedio
  },

});
