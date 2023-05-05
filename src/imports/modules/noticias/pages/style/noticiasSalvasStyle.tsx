import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasSalvasRNStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerTop: {
    width: 'auto',
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
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
    width: 350,
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
