
import {StyleSheet} from 'react-native';

export const contatosStyle = (colors: any)  => StyleSheet.create({
    form:{
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },
    labelForm: {
        paddingTop: 10,
        paddingBottom: 10
    },
    boxAlerta:{
        backgroundColor: colors.vermelhoVivoOpaco, 
        padding: 10, 
        margin: 10, 
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    descricao: {
        flexDirection:  'row',
        alignItems: 'center',
      },
});