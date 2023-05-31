import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/theme';

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

	boxActions: {
		flexDirection: 'row',
	},

	boxImagemUrl: {
		flex:1,
		alignItems: 'center',
		flexDirection: 'row',
	},


	textoUrl: {
		paddingLeft: 2,
		paddingRight: 2,
		overflow: 'hidden',
		color: theme.colors.cinza50
	},

	boxBotoes: {
		flexDirection: 'row',
		marginLeft: 3,
		marginRight: 3,
	},

	imagemCover: {
		width: 'auto',
		backgroundColor: 'transparent',
		margin: 10,
	},

	imagem: {
		width: 40, 
		height: 40,
		backgroundColor: 'transparent',
		borderRadius: 20
	},
	divisor: {
		backgroundColor: theme.colors.cinzaMedio
	  },
});
