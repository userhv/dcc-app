import { StyleSheet } from 'react-native';

export const cardSecaoStyle = (colors:any) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
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
