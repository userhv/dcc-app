import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { modalOportunidadeStyle } from './ModalOportunidadeStyle';
import { IAsyncStorageUser } from '../../context/UserContext';

interface IModalOportunidade {
    handleConfirma: () => Promise<void>;
    handleCancela: () => void;
    oportunidadeTitulo: string;
    historicoNome: string | undefined;
    curriculoNome: string | undefined;
    navigation: any;
    user: IAsyncStorageUser | undefined;
}

export const ModalOportunidade = (props: IModalOportunidade) => {
    const { handleConfirma, handleCancela, oportunidadeTitulo, navigation, user, curriculoNome,  historicoNome} = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = modalOportunidadeStyle(colors);
    const colorScheme = useColorScheme();


    return (
        <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
            <View style={styles.boxTitulo}>
                <View style={{flex: 1, paddingBottom: 5}}>
                    <Text style={styles.texto} variant='titleLarge' numberOfLines={3}> Deseja se candidatar em {oportunidadeTitulo} ?</Text>
                </View>
            </View>
            <View style={{...styles.boxTexto, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 5}}>
                    <View style={styles.boxInputDados}>
                    <Text variant='labelSmall'> Nome</Text>
                        <View style={styles.inputDados}>
                            <Text  numberOfLines={2}> {user?.name}</Text>
                        </View>
                    </View>
                <View style={styles.boxInputDados}>
                    <Text variant='labelSmall'> Email</Text>
                    <View style={styles.inputDados}>
                        <Text  numberOfLines={2}> {user?.email}</Text>
                    </View>
                </View>
                 </View>

                 <View style={{...styles.boxTexto, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 20}}>
                <View style={styles.boxInputDados}>
                    <Text variant='labelSmall'> Curriculo</Text>
                    <View style={styles.inputDados}>
                        <Text  numberOfLines={2}> {curriculoNome}</Text>
                    </View>
                </View>
                <View style={styles.boxInputDados}>
                    <Text variant='labelSmall'> Histórico Escolar</Text>
                    <View style={styles.inputDados}>
                        <Text  numberOfLines={2}> {historicoNome}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.boxBotoes}>
                <Button
                    icon='cancel'
                    style={{marginRight: 10}}
                    buttonColor={colors.accent}
                    onPress={handleCancela}
                    mode='contained'>
                    Cancelar
                </Button>
                <Button
                    icon='check'
                    onPress={async () => {
                        await handleConfirma();
                        handleCancela()}}
                    buttonColor={colors.accent}
                    mode='contained'>
                    Candidatar
                </Button>
            </View>

        </View>
    )
}