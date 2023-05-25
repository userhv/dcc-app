import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const subSecoesStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },

  containerTop: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.branco,
    
  },

  descricao: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
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