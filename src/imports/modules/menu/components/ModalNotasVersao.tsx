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
                <View style={{flex: 1}}>
                    <Text style={styles.texto} variant='titleMedium' numberOfLines={3}> Notas da versão: {getVersion()}</Text>
                </View>
                <IconButton icon='close' onPress={handleClose} 
                            size={28}
                            iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
                            accessible={true}
                            accessibilityLabel='Toque para fechar a tela'
                            accessibilityRole='button'/>
            </View>
            <View style={styles.boxTexto}>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Alteração da paleta de cores do aplicativo.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Ajustes de design para corresponder ao guia de identidade do DCC.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Remoção do suporte a nova arquitetura.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Inclusão das fotos dos professores.</Text>
            </View>
        </View>
    )
}