import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const noticiasListRNStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.branco,
  },
  
  boxLinhaChip: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  chipStyle: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    borderWidth:1,
    borderColor: theme.colors.azul
  },

  icone: {
    margin: 3
  },

  boxIcone: {
    backgroundColor: theme.colors.azulOpacoSelecionado, 
    borderColor: theme.colors.azul,
    borderWidth: 1,
    justifyContent: 'center', 
    borderRadius: 8,
    marginLeft: 10
  },
  
  divisor: {
    backgroundColor: theme.colors.cinza40,
    width: 1, 
    marginLeft: 10,
  },

  loading: {
    justifyContent: 'center', 
    flex: 1, 
    paddingTop: 150, 
    alignItems: 'center',
  }
});