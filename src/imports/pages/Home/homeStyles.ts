import { StyleSheet } from 'react-native';
import { theme } from '../../paper/theme';

export const homeStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: theme.colors.branco,
	},

	divisor: {
		backgroundColor: theme.colors.cinzaMedio
	  },

	blocoInterno: {
		width: '100%',
		height: '100%',
	}
});
