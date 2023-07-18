import {StyleSheet} from 'react-native';

export const boxConexaoInternetStyle = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.vermelhoVivoOpaco,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  texto: {
    color: colors.vermelhoVivo
  },

});
