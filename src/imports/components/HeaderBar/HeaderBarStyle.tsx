import {StyleSheet} from 'react-native';

export const headerBarStyle = (colors:any) => StyleSheet.create({
  containerTop: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,    
  },

  boxDescricao: {
    flexDirection:  'row',
    alignItems: 'center',
    flexGrow: 1,
    flex: 1,
  },

  titulo: {
    flex: 1,
  },

  icone:{
    alignItems: 'center',
  }

});