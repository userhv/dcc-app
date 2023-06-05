import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const subSecoesStyle = StyleSheet.create({
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

  barraPesquisa: {
    backgroundColor: theme.colors.azulOpacoMenuOportunidades,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },

  loading: {
    justifyContent: 'center', 
    flex: 1, 
    alignItems: 'center',
  },

  boxLinhaChip: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  
  chipStyle: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    borderWidth:1,
    borderColor: theme.colors.azul
  },

});