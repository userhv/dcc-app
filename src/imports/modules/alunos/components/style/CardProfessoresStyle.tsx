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
    borderColor: colors.accent,
    borderWidth: 1,
    margin: 5,
    borderRadius: 4,
    padding: 2
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
