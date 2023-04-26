import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/theme';

export const cardNoticiasStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: theme.colors.branco,
	},
	titulo: {
		fontSize: 17, 
		justifyContent: 'center', 
		paddingTop: 10, 
		color: theme.colors.cinza10
	},
	subtitulo: {
		fontSize: 14, justifyContent: 'center', paddingTop: 10
	},
	botoes: {
		borderColor: 'transparent',
		backgroundColor: 'transparent'
	},
	imagem: {
		width: 40, 
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white'
	},
	divisor: {
		backgroundColor: theme.colors.cinzaMedio
	  },
});
