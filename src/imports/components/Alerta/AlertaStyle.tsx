import {StyleSheet} from 'react-native';
import {theme} from '../../paper/theme';

export const alertaStyle = StyleSheet.create({
  boxAlerta: {
    backgroundColor: theme.colors.vermelhoVivoOpaco,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  descricao: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  iconeAlerta: {
    flexDirection: 'row', 
    paddingRight: 10
},
});
