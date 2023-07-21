import {StyleSheet} from 'react-native';

export const viewOfertasDisciplinasStyle = (colors:any) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 5,
  },
  boxPrincipal: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  boxTexto: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    margin: 10
  },
  boxDetalhes: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 10,
    flexDirection: 'column'
  },
  viewDetalhes: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
  }
});
