import {StyleSheet} from 'react-native';

export const modalAreasStyle = (colors:any) => StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: 'column',
  },

  containerTopo: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  boxAreas: {
    backgroundColor: colors.background,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex:1, 
    flexDirection: 'column'
  },

  boxDescricao: {
    flexDirection: 'column',
    flex: 1,
  },
  iconeFechar: {
    justifyContent: 'center',
  }
});
