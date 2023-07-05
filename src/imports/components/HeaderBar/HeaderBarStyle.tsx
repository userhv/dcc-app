import {StyleSheet} from 'react-native';
import { theme } from '../../paper/theme';

export const headerBarStyle = StyleSheet.create({
  containerTop: {
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.branco,    
  },

  boxDescricao: {
    flexDirection:  'row',
    alignItems: 'center',
    flexGrow: 1,
    flex: 1
  },

  titulo: {
    flex: 1,
  },

  icone:{
    alignItems: 'center',
  }

});