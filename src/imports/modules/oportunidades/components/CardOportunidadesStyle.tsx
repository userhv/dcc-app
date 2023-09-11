import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/theme';

export const cardOportunidadesStyle  = (colors:any) => StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.background,
		margin: 1,
		height: 'auto',
		borderRadius: 0,
		marginBottom: 10
	},
	titulo: {
		fontSize: 17, 
		justifyContent: 'center', 
		paddingTop: 10, 
		color: colors.cinza10
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
	},

	boxHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 5,
		paddingRight: 5,    
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
		width: 30, 
		height: 30,
		backgroundColor: 'transparent',
		borderRadius: 10
	},
	divisor: {
		backgroundColor: colors.cinzaMedio,
	  },
});
