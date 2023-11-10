import {StyleSheet} from 'react-native';

export const noticiasListRNStyle = (colors: any)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  boxLinhaChip: {
    marginBottom: 5,
    flexDirection: 'row',
  },

  chipStyle: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  
  divisor: {
    width: 1, 
    marginLeft: 10,
    backgroundColor: colors.divisorVertical
  },
});
