import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/theme';

export const cardSecaoInternoStyle = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		backgroundColor: theme.colors.branco,
		borderRadius: 0,
	},
	
	boxPrincipal: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	boxDescricao: {
		flexDirection: 'column', 
		flex: 1,
	}
});
