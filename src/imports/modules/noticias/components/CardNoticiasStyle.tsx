import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/theme';

export const cardNoticiasStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: theme.colors.branco,
		margin: 1,
		height: 'auto'
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

	boxImagemUrl: {
		alignItems: 'flex-start',
		width: '70%',
		flexDirection: 'row',

	},

	textoUrl: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		width: '80%',
		paddingLeft: 2,
		color: theme.colors.cinza50
	},

	imagemCover: {
		width: 'auto',
		backgroundColor: 'transparent',
		margin: 10,
		// borderRadius: 1,
		
	},

	imagem: {
		width: 40, 
		height: 40,
		borderRadius: 10,
		backgroundColor: 'transparent'
	},
	divisor: {
		backgroundColor: theme.colors.cinzaMedio
	  },
});
