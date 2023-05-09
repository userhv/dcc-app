import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/theme';

export const noticiasDetailRNStyle = StyleSheet.create({
	container: {
		flex: 1,
		margin: 1
	  },

	  containerTop: {
		paddingTop: 10,
		flexDirection: 'row',
		backgroundColor: theme.colors.branco,
	  },

	  containerIcone: {
		justifyContent: 'center',
		alignItems: 'center',
	  },

	  icone: {
		marginLeft: 10,
	  },

	  descricao: {
		flexDirection: 'row',
		alignItems: 'center',
		flexShrink: 1
	  },

	  botaoInscrever:{
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
		marginBottom: 5
	  },

	  scrollView: {
		flex: 1, 
		marginLeft: 10,
		marginBottom: 10,
		marginRight: 10,
	  },

	  baseRender: {
		fontSize: 15, 
		marginLeft:5, 
		marginRight: 5
	},

});
