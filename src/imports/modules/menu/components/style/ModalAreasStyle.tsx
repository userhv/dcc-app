import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const modalAreasStyle = StyleSheet.create({
  container: {flex: 1, paddingBottom: 10, backgroundColor: theme.colors.branco},

  containerTopo: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxDescricao: {
    flexDirection: 'column',
    flex: 1,
  },
  iconeFechar: {
    justifyContent: 'center',
  },
  divisor: {
    backgroundColor: theme.colors.cinzaMedio,
  },
});
