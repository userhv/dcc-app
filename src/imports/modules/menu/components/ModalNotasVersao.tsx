import React from 'react';
import { View } from 'react-native';
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

    return (
        <View style={styles.container}>
            <View style={styles.boxTitulo}>
                <Text style={styles.texto} variant='titleMedium'> Notas da versão: {getVersion()}</Text>
                <IconButton icon='close' onPress={handleClose} 
                            size={28}
                            iconColor={colors.accent}
                            accessible={true}
                            accessibilityLabel='Toque para fechar a tela'
                            accessibilityRole='button'/>
            </View>
            <View style={styles.boxTexto}>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Suporte ao modo escuro [Wallace] </Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Alteração do filtro de área de pesquisa. </Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Adição do indicador de sem internet. </Text>
            </View>
        </View>
    )
}