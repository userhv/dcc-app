import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  Platform, View, useColorScheme  } from 'react-native';
import { useTheme, Text} from 'react-native-paper';
import { usuarioAutenticadoStyles } from './UsuarioAutenticadoStyle';
import { Alerta } from '../../../../components/Alerta/Alerta';
import { styleIOS } from '../../../../paper/stylesIOS';
import { IAsyncStorageUser } from '../../../../context/UserContext';

interface IUsuarioAutenticado {
	user: IAsyncStorageUser;
	navigation: NativeStackNavigationProp<any>;
}

export const UsuarioAutenticado = (props: IUsuarioAutenticado) => {
	const theme = useTheme<{[key:string]: any}>();
    const { user, navigation } = props;
	const { colors } = theme;
	const styles = usuarioAutenticadoStyles(colors);
	const colorScheme = useColorScheme();
    const style = Platform.OS === 'ios' ? styleIOS : null;
	return (
        <>
        <Alerta detalhes={
        <Text variant='labelLarge' 
            style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}} numberOfLines={4}> 
                Autenticado pela conta do DCC. Seus dados são salvos apenas localmente. </Text>
            } />
        <View style={{...styles.areaLogin, ...style, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
            <View style={styles.boxInputDados}>
                <Text variant='labelMedium' accessible={true}> Nome</Text>
                <View style={styles.inputDados}>
                    <Text variant='bodyLarge' numberOfLines={2}
                        accessible={true}
                        accessibilityLabel={user.nome}
                    > {user.nome}</Text>
                </View>
            </View>
            <View style={styles.boxInputDados}>
                <Text variant='labelMedium' accessible={true}> Email</Text>
                <View style={styles.inputDados}>
                    <Text variant='bodyLarge' numberOfLines={2}
                        accessible={true}
                        accessibilityLabel={user.email}> {user.email}</Text>
                </View>
            </View>
            <View style={styles.boxInputDados}>
                <Text variant='labelMedium' accessible={true}> Vínculo</Text>
                <View style={styles.inputDados}>
                    <Text variant='bodyLarge' numberOfLines={2}
                        accessible={true}
                        accessibilityLabel={user.titulo}
                    > {user.titulo}</Text>
                </View>
            </View>
        </View>	 
        </> 	
	);
};
