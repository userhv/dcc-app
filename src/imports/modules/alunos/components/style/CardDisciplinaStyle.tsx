import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const cardDisciplinaStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.branco,
    // borderRadius: 8,
    // marginBottom: 5,
  },
  boxPrincipal: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  boxTexto: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    margin: 10
  },
  texto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    color: theme.colors.azul,
    backgroundColor: 'transparent',
  },
  boxDetalhes: {
    // backgroundColor: theme.colors.azulOpacoMenuOportunidades,
    // borderBottomEndRadius: 8,
    // borderBottomStartRadius: 8,
    padding: 10,
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
    color: theme.colors.preto,
    paddingBottom: 5,
  },
  detalhes: {
    flexDirection: 'column',
    backgroundColor: theme.colors.azulOpacoMenuOportunidades,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 8,
    padding: 10,
  },
  divisor: {
    backgroundColor: theme.colors.cinzaMedio,
  },
});
