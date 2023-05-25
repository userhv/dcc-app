import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasListRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: theme.colors.branco,
  },

  containerTop: {
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.branco,
  },

  boxLinhaChip: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  chipStyle: {
    marginRight: 10,
    justifyContent: 'flex-start',
    borderWidth:1,
    borderColor: theme.colors.azul
  },

  icone: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  descricao: {
    flex:1,
    flexDirection: 'row',
    justifyContent:  'center',
    alignItems: 'center'
  },
  
  divisor: {
    backgroundColor: theme.colors.cinza40,
    width: 1, 
    marginRight: 6,
  },

  boxIconeVazio: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150, 
  },

  texto: {
    flexWrap: 'wrap',
    width: 'auto',
    padding: 10,
    textAlign: 'center'
  },

  loading: {
    justifyContent: 'center', 
    flex: 1, 
    paddingTop: 150, 
    alignItems: 'center',
  }
});