import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/theme';

export const cardProfessoresStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: theme.colors.branco,
		margin: 1,
	},
	titulo: {
		justifyContent: 'center', 
		paddingTop: 10, 
		color: theme.colors.cinza10,
	},
	subtitulo: {
		fontSize: 14, 
		justifyContent: 'center', 
		paddingTop: 10
	},
    boxArea: {
		flexDirection: 'row', 
		flexWrap: 'wrap'
	},
    containerArea: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        paddingLeft: 10,
    },
    chipArea: {
        borderColor: theme.colors.azul, 
        borderWidth: 1, 
        margin: 5,
        borderRadius: 4,
        backgroundColor: theme.colors.azulOpacoMenuOportunidades,
    },
    textoChip: {
        color: theme.colors.azul,
		margin: 1
    },
    boxActions: {
		flexDirection: 'row',
		flex: 1
	},
    botoes: {
		borderColor: 'transparent',
		backgroundColor: 'transparent'
	},
    divisor: {
		backgroundColor: theme.colors.cinzaMedio
	  },
    imagemCover: {
		width: 100,
		height: 100,
		backgroundColor: 'transparent',
		marginLeft: 10,
		borderRadius: 10
	},
	iconeEmail: {
		marginRight: 3, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	boxBotaoCompartilhar: {
		alignItems: 'flex-end', 
		flex: 1, 
		justifyContent: 'center'
	},
	boxIconeEmail: { 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
})