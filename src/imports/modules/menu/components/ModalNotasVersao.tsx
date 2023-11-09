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
        <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
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
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - App DCC News agora chama DCC.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Aba de Para o aluno renomeada em Para você.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Aba de Menu renomeada em Mais.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Novos ícones nas abas Para você e Mais.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Nova tela minha conta na aba Mais.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Alteração do design da aba Mais.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Nova tela de oportunidades na aba Para você.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Suporte para autenticação na conta do DCC.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Suporte para inscrição em oportunidades do DCC pelo aplicativo.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Novos ícones na aba Mais.</Text>
                <Text variant='bodyMedium' style={{paddingBottom: 5}}> - Redesign dos botões no card de disciplinas.</Text>
            </View>
        </View>
    )
}