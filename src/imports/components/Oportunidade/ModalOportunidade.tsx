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
            <View style={{...styles.boxTexto, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginBottom: 5, backgroundColor: colorScheme === 'dark' ? colors.cinza30 : colors.branco, elevation: 1}}>
                    <View style={styles.boxInputDados}>
                    <Text variant='labelMedium'> Nome do candidato</Text>
                        <View style={styles.inputDados}>
                            <Text  numberOfLines={2}> {user?.nome}</Text>
                        </View>
                    </View>
                <View style={styles.boxInputDados}>
                    <Text variant='labelMedium'> Email para contato</Text>
                    <View style={styles.inputDados}>
                        <Text  numberOfLines={2}> {user?.email}</Text>
                    </View>
                </View>
                 </View>

                 <View style={{...styles.boxTexto, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, marginBottom: 10, backgroundColor: colorScheme === 'dark' ? colors.cinza30 : colors.branco, elevation: 1}}>
                <View style={styles.boxInputDados}>
                    <Text variant='labelMedium'> Curriculo</Text>
                    <View style={styles.inputDados}>
                        <Text  numberOfLines={2}> {curriculoNome}</Text>
                    </View>
                </View>
                <View style={styles.boxInputDados}>
                    <Text variant='labelMedium'> Histórico Escolar</Text>
                    <View style={styles.inputDados}>
                        <Text  numberOfLines={2}> {historicoNome}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.boxBotoes}>
                <Button
                    style={{marginRight: 10}}
                    textColor={colors.accentClaro}
                    onPress={handleCancela}
                    mode='text'>
                    Cancelar
                </Button>
                <Button
                    onPress={async () => {
                        await handleConfirma();
                        handleCancela()}}
                    textColor={colors.accentClaro}
                    mode='text'>
                    Candidatar
                </Button>
            </View>

        </View>
    )
}