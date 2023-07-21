import {StyleSheet} from 'react-native';

export const noticiasSalvasStyle =  (colors:any) => StyleSheet.create({
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

});