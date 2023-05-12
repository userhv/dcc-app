import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasListRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1
  },

  containerTop: {
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.branco,
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

});
