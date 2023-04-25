import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/theme';

export const homeHeaderStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		background: theme.colors.branco,
		borderBottomWidth: 1,
		borderColor: '#ddd',
		elevation: 1
	},
	titulo: {
		color: theme.colors.cinza
	},
	botaoLogout: {
		borderRadius: 5,
		margin: 0,
		borderColor: theme.colors.verdeVale
	},
	botaoLogoutDisable: {
		borderRadius: 5,
		margin: 0,
		borderColor: theme.colors.amareloVale,
		backgroundColor: theme.colors.amareloVale
	},
	textButton: {
		color: theme.colors.verdeVale
	},
	usuario: {
		fontSize: 20,
		color: theme.colors.onPrimaryContainer
	},
	matricula: {
		fontSize: 16,
		color: theme.colors.onBackground
	},
	itemMenu: {
		fontSize: 16,
		color: theme.colors.primary
	},
	avatar: {
		display: 'flex',
		backgroundColor: theme.colors.branco,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	menu: {
		background: theme.colors.branco,
		backgroundColor: '#FFF'
	}
});
