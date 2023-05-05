import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasListRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1
  },

  containerTop: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.branco,
  },

  icone: {
    paddingRight: 15
  },

  descricao: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  divisor: {
    backgroundColor: theme.colors.cinzaMedio
  },

});
