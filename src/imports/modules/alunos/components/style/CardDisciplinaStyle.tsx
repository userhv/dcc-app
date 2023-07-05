import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const cardDisciplinaStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.branco,
  },
  boxPrincipal: {
    flexDirection: 'column',
  },
  boxTopo: {
    flexDirection: 'row',
  },
  boxTitulo: {
    flexDirection:'column', 
    flex: 1,
    margin: 10
  },

  textoCodigo: {
    marginTop: 5,
  },
  boxDetalhes: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'column',
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
    paddingBottom: 5,
  },
  detalhes: {
    flexDirection: 'column',
    backgroundColor: theme.colors.azulOpacoMenuOportunidades,
    marginBottom: 5,
    borderRadius: 16,
    padding: 10,
  },
  divisor: {
    backgroundColor: theme.colors.cinzaMedio,
  },
});
