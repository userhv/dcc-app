
import {StyleSheet} from 'react-native';
import {theme} from '../../paper/theme';

export const animatedHeaderStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    left: 0,
    right: 0,
    zIndex: 0,
    flexShrink: 1,
  },
  texto: {
    color: theme.colors.branco,
    overflow: 'hidden',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end', 
    flex: 1, 
    alignItems: 'baseline',
    padding: 10
  },
  iconeEsquerda: {
    paddingTop: 13, 
    paddingRight: 25
  }
});