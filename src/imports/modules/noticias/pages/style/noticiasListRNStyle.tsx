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

  boxChip: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },

  chipStyle: {
    marginRight: 10,
    justifyContent: 'flex-start',
    borderWidth:1,
  },

  icone: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  descricao: {
    flex:1,
    flexDirection: 'row',
    justifyContent:  'center',
    alignItems: 'center'
  },
  
  divisor: {
    backgroundColor: theme.colors.cinzaMedio
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
