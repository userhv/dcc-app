import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const oportunidadesListRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
  },

  containerTop: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.branco,
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

});
