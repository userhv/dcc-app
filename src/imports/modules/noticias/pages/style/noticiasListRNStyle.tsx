import {StyleSheet} from 'react-native';

export const noticiasListRNStyle = (colors: any)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  boxLinhaChip: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  chipStyle: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },

  icone: {
    margin: 3
  },

  boxIcone: {
    backgroundColor: colors.chipDesativado, 
    justifyContent: 'center', 
    borderRadius: 8,
    marginLeft: 10
  },
  
  divisor: {
    width: 1, 
    marginLeft: 10,
  },
});