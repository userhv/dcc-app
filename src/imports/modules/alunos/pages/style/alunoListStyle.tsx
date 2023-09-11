import {StyleSheet} from 'react-native';

export const alunosListStyle = (colors:any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: colors.background,
  },
  loading: {
    justifyContent: 'center', 
    flex: 1, 
    paddingTop: 150, 
    alignItems: 'center',
  }
});