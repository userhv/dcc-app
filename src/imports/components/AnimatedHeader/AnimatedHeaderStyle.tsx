import {StyleSheet} from 'react-native';

export const animatedHeaderStyle = (colors: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    left: 0,
    right: 0,
    zIndex: 0,
    flexShrink: 1,
  },
  texto: {
    overflow: 'hidden',
    flexWrap: 'nowrap',
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'baseline',
    padding: 10
  },
  iconeEsquerda: {
    paddingTop: 13, 
    paddingRight: 25
  }
});