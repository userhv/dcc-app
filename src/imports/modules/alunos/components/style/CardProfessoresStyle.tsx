import {StyleSheet} from 'react-native';

export const cardProfessoresStyle = (colors:any) =>  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
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
    margin: 5,
    borderRadius: 4,
    padding: 3
  },
  textoChip: {
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
  imagemCover: {
    width: 120,
    marginLeft: 10,
    borderRadius: 10,
  },
  boxBotaoCompartilhar: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
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
