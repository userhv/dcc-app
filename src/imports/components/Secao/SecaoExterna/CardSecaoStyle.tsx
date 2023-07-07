import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/theme';

export const cardSecaoStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.branco,
		borderRadius: 0,
	},
	botoes: {
		marginLeft: 15,
	},
	boxPrincipal: {
		flexDirection: 'row',
		marginBottom: 5,
		marginTop: 5,
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
