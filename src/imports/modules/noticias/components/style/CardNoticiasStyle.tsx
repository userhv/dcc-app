import { StyleSheet } from 'react-native';

export const cardNoticiasStyle = (colors:any) => StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.background,
		borderRadius: 0
	},
	subtitulo: {
		 paddingTop: 10
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
		borderRadius: 10
	},

});
