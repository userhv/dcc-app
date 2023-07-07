
import {StyleSheet} from 'react-native';
import {theme} from '../../../../paper/theme';

export const ofertaStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        backgroundColor: theme.colors.branco,
      },
    fabRetornaTop: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 10,
        marginBottom: 10,
      },
      barraPesquisa: {
        backgroundColor: theme.colors.azulOpacoMenuOportunidades,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
      },
      chipArea: {
        borderColor: theme.colors.azul,
        borderWidth: 1,
        marginTop: 5,
        marginLeft: 10,
        borderRadius: 4,
        padding: 2,
        backgroundColor: theme.colors.azulOpacoMenuOportunidades,
        flexDirection: 'row',
        alignItems: 'center'
      },
      textoChip: {
        color: theme.colors.azul,
        margin: 1,
      },
      fabEncontraSalas: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: 10,
        marginBottom: 10,
      },

});

