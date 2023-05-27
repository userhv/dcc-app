import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/theme';

export const cardSecaoStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: theme.colors.branco,
		borderRadius: 0,
		margin: 1,
		paddingBottom: 10
	},
	titulo: {
		fontSize: 17, 
		justifyContent: 'center', 
		paddingTop: 10, 
		color: theme.colors.cinza10
	},
	subtitulo: {
		fontSize: 14, 
		justifyContent: 'center', 
		paddingTop: 5
	},
	botoes: {
		marginLeft: 15,
	},
	boxPrincipal: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	boxBotao:{
		flexDirection: 'column', 
		justifyContent: 'center',
	},
	boxDescricao: {
		flexDirection: 'column', 
		flex: 1,
	}



});
