import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/theme';

export const homeHeaderStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
		background: theme.colors.branco,
	},

	viewImagem: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	imagem: {
		width: 60,
		height: 60,
		backgroundColor: 'transparent'
	},
});
