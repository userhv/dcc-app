import { StyleSheet } from 'react-native';

export const cardOportunidadesStyle  = (colors:any) => StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		backgroundColor: colors.background,
	  },
	  boxPrincipal: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'space-between',
	  },
	  boxTexto: {
		flexDirection: 'row',
		marginTop: 10
	  },
	  boxDetalhes: {
		borderRadius: 16,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
		flexDirection: 'column',
	  },
	  viewDetalhes: {
		flexDirection: 'column',
		flex: 1,
		margin: 5,
	  },

	scrollView: {
		flex: 1, 
		marginLeft: 10,
		marginBottom: 10,
		marginRight: 10,
	  },
	baseRender: {
		fontSize: 15, 
		paddingLeft:10, 
		paddingRight: 10,
		color: colors.onSurface
	},
	divisor: {
		backgroundColor: colors.cinzaMedio,
	  },
	  imagem: {
		width: 300, 
		height: 100,
	},
});
