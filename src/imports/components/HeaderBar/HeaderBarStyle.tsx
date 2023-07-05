import {StyleSheet} from 'react-native';
import { theme } from '../../paper/theme';

export const headerBarStyle = StyleSheet.create({
  containerTop: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.branco,    
  },

  descricao: {
    flexDirection:  'row',
    alignItems: 'center',
    flexGrow: 1,
    overflow: 'hidden',
    flex: 1
  },


});