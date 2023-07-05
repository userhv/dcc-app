import * as React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../../../paper/theme';
import { modalVersaoStyle } from './style/ModalVersaoStyle';
import { getVersion } from 'react-native-device-info';

interface IModalVersao {
    handleClose: () => void;
}

export const ModalVersao = (props: IModalVersao) => {
    const { handleClose } = props;
    return (
        <View style={modalVersaoStyle.container}>
            <View style={modalVersaoStyle.boxTitulo}>
                <Text style={modalVersaoStyle.texto} variant='titleMedium'> Notas da versão: {getVersion()}</Text>
                <IconButton icon='close' onPress={handleClose} iconColor={theme.colors.azul} size={25}/>
            </View>
            <View style={modalVersaoStyle.boxTexto}>
                <Text variant='bodyMedium' style={{textAlign: 'auto', padding: 10}}>
{ `     
        - Ajuste de UI no WebView
        - Adição do patch notes na tela de início [Marco Túlio]
        - Ajustes nas imagens das notícias [Pâmela]
        - Melhorias de desempenho
        - Adição do ícone de retornar ao topo da lista na tela de notícias [Wallace]
                ` }    
                </Text>
            </View>
        </View>


    )
}