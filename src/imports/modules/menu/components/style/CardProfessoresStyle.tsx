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
		fontSize: 17, 
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
        flexDirection: 'column', 
        paddingLeft: 10
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
        backgroundColor: theme.colors.azulOpacoMenuOportunidades
    },
    textoArea: {
        color: theme.colors.cinza10
    },
    textoChip: {
        color: theme.colors.azul
    },
    boxActions: {
		flexDirection: 'row',
	},
    botoes: {
		borderColor: 'transparent',
		backgroundColor: 'transparent'
	},
    divisor: {
		backgroundColor: theme.colors.cinzaMedio
	  },
    imagemCover: {
		width: 'auto',
		backgroundColor: 'transparent',
		margin: 10,
	},

	imagem: {
		width: 40, 
		height: 40,
		backgroundColor: 'transparent'
	},
})