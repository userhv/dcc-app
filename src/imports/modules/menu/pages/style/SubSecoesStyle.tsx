import {StyleSheet} from 'react-native';

export const subSecoesStyle = (colors:any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: colors.background,
  },

  boxIconeVazio: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    flexWrap: 'wrap',
    padding: 10,
    textAlign: 'center'
  },
  
  divisor: {
    backgroundColor: colors.cinzaMedio
  },

  barraPesquisa: {
    backgroundColor: colors.azulOpacoMenuOportunidades,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },

  loading: {
    justifyContent: 'center', 
    flex: 1, 
    alignItems: 'center',
  },

  boxLinhaChip: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  
  chipStyle: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    borderWidth:1,
    borderColor: colors.azul
  },

  modal:{
    textAlign: 'auto', 
    backgroundColor: colors.preto,
    flex: 1,
    height:  150,
    width: '100%'
  }

});