import React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
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
                <IconButton icon='close' onPress={handleClose} 
                            size={28}
                            accessible={true}
                            accessibilityLabel='Toque para fechar a tela'
                            accessibilityRole='button'/>
            </View>
            <View style={modalVersaoStyle.boxTexto}>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Remoção da guia "Inicio" [Marco Tulio]</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Adição da guia "Para o aluno"</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Adição da tela de oferta de disciplinas</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Icone para visualizar a barra de busca nas telas de professor e oferta de disciplinas</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - As telas de laboratorio, professores agora estão na guia "Para o aluno"</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Adição do icone de limpar filtros na tela de professores</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Nova tela de notas da versão na guia "Menu"</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Adição do botão de compartilhar na webView</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Melhorias no constraste da UI</Text>
            </View>
        </View>
    )
}