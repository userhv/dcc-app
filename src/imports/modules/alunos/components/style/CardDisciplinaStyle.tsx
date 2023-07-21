import {StyleSheet} from 'react-native';

export const cardDisciplinaStyle = (colors:any) => StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: colors.background,
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
    paddingBottom: 10,
    flexDirection: 'column',
  },
  viewDetalhes: {
    backgroundColor: colors.azul,
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
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 16,
    padding: 10,
  },
});
