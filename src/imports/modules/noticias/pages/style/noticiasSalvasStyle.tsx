import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasSalvasRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },

  containerTop: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.branco,
    
  },

  descricao: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto',
  },

  boxIconeVazio: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
  },

  texto: {
    flexWrap: 'wrap',
    width: 'auto',
    padding: 10,
    textAlign: 'center'
  },
  
  divisor: {
    backgroundColor: theme.colors.cinzaMedio
  },

});
