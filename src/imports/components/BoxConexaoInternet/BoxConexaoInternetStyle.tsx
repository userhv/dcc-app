import {StyleSheet} from 'react-native';
import {theme} from '../../paper/theme';

export const boxConexaoInternetStyle = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.vermelhoVivoOpaco,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  texto: {
    color: theme.colors.vermelhoVivo
  },

});
