import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const modalAreasStyle = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: 'column',
  },

  containerTopo: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  boxAreas: {
    backgroundColor: theme.colors.branco,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex:1, 
    flexDirection: 'column'
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
