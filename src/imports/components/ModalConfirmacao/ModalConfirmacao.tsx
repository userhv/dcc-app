import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { modalConfirmacaoStyle } from './ModalConfirmacaoStyle';

interface IModalConfirmacao {
    handleConfirma: () => Promise<void>;
    handleCancela: () => void;
    texto: string;
    titulo: string;
    labelConfirmar?: string;
    labelCancelar?: string;
    navigation: any;
}

export const ModalConfirmacao = (props: IModalConfirmacao) => {
    const { handleConfirma, handleCancela, texto, titulo, labelConfirmar, labelCancelar, navigation } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = modalConfirmacaoStyle(colors);
    const colorScheme = useColorScheme();

    return (
        <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
            <View style={styles.boxTitulo}>
                <View style={{flex: 1}}>
                    <Text style={styles.texto} variant='titleLarge' numberOfLines={3}> {titulo}</Text>
                </View>
            </View>
            <View style={styles.boxTexto}>
                <Text variant='bodyMedium' style={{paddingBottom: 5}} numberOfLines={4}> {texto} </Text>
            </View>
            <View style={styles.boxBotoes}>
                <Button
                    icon='cancel'
                    style={{marginRight: 10}}
                    buttonColor={colors.accent}
                    onPress={handleCancela}
                    mode='contained'>
                    {labelCancelar ?? 'Cancelar'}
                </Button>
                <Button
                    icon='check'
                    onPress={async () => {
                        await handleConfirma();
                        handleCancela()}}
                    buttonColor={colors.accent}
                    mode='contained'>
                    {labelConfirmar ?? 'Confirmar'}
                </Button>
            </View>

        </View>
    )
}