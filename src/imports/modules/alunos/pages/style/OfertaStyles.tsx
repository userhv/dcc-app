
import {StyleSheet} from 'react-native';

export const ofertaStyles =(colors:any) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        backgroundColor: colors.background,
      },
    fabRetornaTop: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 10,
        marginBottom: 10,
      },
      barraPesquisa: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
      },
      chipArea: {
        borderColor: colors.azul,
        borderWidth: 1,
        marginTop: 5,
        marginLeft: 10,
        borderRadius: 4,
        padding: 2,
        backgroundColor: colors.azulOpacoMenuOportunidades,
        flexDirection: 'row',
        alignItems: 'center'
      },
      textoChip: {
        color: colors.azul,
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

