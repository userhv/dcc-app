import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const menuListStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: theme.colors.branco,
  },
  loading: {
    justifyContent: 'center', 
    flex: 1, 
    paddingTop: 150, 
    alignItems: 'center',
  }
});