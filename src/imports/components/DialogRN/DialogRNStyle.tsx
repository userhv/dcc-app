import { StyleSheet } from 'react-native';
import { theme } from '../../paper/theme';

export const dialogRNStyles = StyleSheet.create({
	actions: { width: '100%', alignItems: 'center', justifyContent: 'center' },
	dismissButton: {
		borderColor: theme.colors.verde,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 10,
		color: theme.colors.verde,
		borderRadius: 4
	},
	confirmButton: {
		backgroundColor: theme.colors.verde,
		paddingHorizontal: 16,
		paddingVertical: 10,
		color: theme.colors.branco,
		borderRadius: 4
	}
});
