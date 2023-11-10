import React from 'react';
import { Button,  Text,  IconButton, useTheme } from 'react-native-paper';
import { boxUploadStyle } from './BoxUploadStyle';
import { View, useColorScheme } from 'react-native';

interface IBoxUpload {
    tituloUpload: string;
    labelBotaoAcao: string;
    tipoUpload: string | undefined;
    acao: (value: React.SetStateAction<string | undefined>) => void;
    selecionaAcao: () => Promise<void>;
}

export const BoxUpload = (props: IBoxUpload) => {
    const {tipoUpload, acao, selecionaAcao, tituloUpload, labelBotaoAcao} = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = boxUploadStyle(colors);
	const colorScheme = useColorScheme();

    return(
        <>
        <Text variant='labelMedium'> {tituloUpload}</Text>
        {tipoUpload ?(
            <View style={styles.boxUpload}>
                <Text variant='bodyLarge' numberOfLines={2}>  {tipoUpload} </Text>
                <IconButton icon={'trash-can-outline'} 
                            iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} 
                            onPress={() => acao(undefined)}/>
            </View>
        ) : (
            <View style={styles.boxBotoesUpload}>
                <Button mode='contained' 
                        buttonColor={colorScheme === 'dark' ? colors.cinza30 : colors.cinzaClaro}
                        style={{borderRadius: 8}}
                        onPress={selecionaAcao}> 
                        <Text style={{color: colorScheme === 'dark' ? colors.branco : colors.quasePreto}}>
                            {labelBotaoAcao}
                        </Text>
                </Button>
            </View>
        )}
        </>
    )
}