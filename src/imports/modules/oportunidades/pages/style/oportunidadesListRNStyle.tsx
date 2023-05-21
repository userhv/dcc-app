import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const oportunidadesListRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: theme.colors.branco,
  },

  containerTop: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.branco,
  },

  detailTitulo: {
    flex: 1,
    margin: 10,
    paddingLeft: 5,
  },

  descricao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,    
  },

  boxIconeVazio: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150, 
  },

  texto: {
    flexWrap: 'wrap',
    width: 'auto',
    padding: 10,
    textAlign: 'center'
  },

  loading: {
    justifyContent: 'center', 
    flex: 1, 
    paddingTop: 150, 
    alignItems: 'center',
  },
  boxChip: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  chipStyle: {
    marginRight: 10,
    justifyContent: 'flex-start',
    borderWidth:1,
  },


});
