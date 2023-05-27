import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasSalvasStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: theme.colors.branco,
  },

  boxIconeVazio: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    flexWrap: 'wrap',
    padding: 10,
    textAlign: 'center'
  },
  
  divisor: {
    backgroundColor: theme.colors.cinzaMedio
  },

});