import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const cardProfessoresStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.branco,
    borderRadius: 0,
  },
  boxArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerArea: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  chipArea: {
    borderColor: theme.colors.azul,
    borderWidth: 1,
    margin: 5,
    borderRadius: 4,
    padding: 2,
    backgroundColor: theme.colors.azulOpacoMenuOportunidades,
  },
  textoChip: {
    color: theme.colors.azul,
    margin: 1,
  },
  boxActions: {
    flexDirection: 'row',
    flex: 1,
  },
  boxFiltro: {
    paddingLeft: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  filtro: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  botoes: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  divisor: {
    backgroundColor: theme.colors.cinzaMedio,
  },
  imagemCover: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    marginLeft: 10,
    borderRadius: 8,
  },
  boxBotaoCompartilhar: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  boxIconeEmail: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  fabRetornaTop: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 10,
    marginBottom: 10,
  },
});
