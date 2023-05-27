import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/theme';

export const cardSecaoInternoStyle = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		backgroundColor: theme.colors.branco,
		borderRadius: 0,
		margin: 1,
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
		paddingTop: 10
	},
	boxPrincipal: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	boxDescricao: {
		flexDirection: 'column', 
		flex: 1,
	}
});
