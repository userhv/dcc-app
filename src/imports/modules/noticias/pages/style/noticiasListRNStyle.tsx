import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasListRNStyle = StyleSheet.create({
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
    width: '100%',
  },

  descricao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  
  divisor: {
    backgroundColor: theme.colors.cinzaMedio
  },

});
