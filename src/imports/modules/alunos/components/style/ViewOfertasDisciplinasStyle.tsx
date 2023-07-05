import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const viewOfertasDisciplinasStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.azulOpacoMenuOportunidades,
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
    justifyContent: 'center',
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
    backgroundColor: theme.colors.azul,
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    borderRadius: 8,
    padding: 10,
  },
  textoDetalhes: {
    color: theme.colors.branco, 
    textAlign: 'center'
  }
});
