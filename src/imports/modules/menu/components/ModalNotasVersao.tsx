import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { modalNotasVersaoStyle } from './style/ModalNotasVersaoStyle';
import { getVersion } from 'react-native-device-info';

interface IModalVersao {
    handleClose: () => void;
}

export const ModalNotasVersao = (props: IModalVersao) => {
    const { handleClose } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = modalNotasVersaoStyle(colors);
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <View style={styles.boxTitulo}>
                <Text style={{...styles.texto, color: colorScheme === 'dark' ? colors.cinza90 : colors.cinza30}} variant='titleMedium'> Notas da versão: {getVersion()}</Text>
                <IconButton icon='close' onPress={handleClose} 
                            size={28}
                            accessible={true}
                            accessibilityLabel='Toque para fechar a tela'
                            accessibilityRole='button'/>
            </View>
            <View style={styles.boxTexto}>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Remoção da guia "Inicio" [Marco Tulio]</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Adição da guia "Para o aluno"</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Adição da tela de oferta de disciplinas</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Icone para visualizar a barra de busca nas telas de professor e oferta de disciplinas</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - As telas de laboratorio, professores agora estão na guia "Para o aluno"</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Adição do icone de limpar filtros na tela de professores</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Nova tela de notas da versão na guia "Menu"</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Adição do botão de compartilhar na webView</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5, color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}> - Melhorias no constraste da UI</Text>
            </View>
        </View>
    )
}