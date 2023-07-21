import { StyleSheet } from 'react-native';

export const cardSecaoInternoStyle = (colors: any) => StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		backgroundColor: colors.background,
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
