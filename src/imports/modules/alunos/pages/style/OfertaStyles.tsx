
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
        marginBottom: 5
      },

});

