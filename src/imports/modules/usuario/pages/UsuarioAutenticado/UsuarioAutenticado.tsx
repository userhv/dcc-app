import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  Platform, View, useColorScheme  } from 'react-native';
import { useTheme, Text} from 'react-native-paper';
import { usuarioAutenticadoStyles } from './UsuarioAutenticadoStyle';
import { Alerta } from '../../../../components/Alerta/Alerta';
import { styleIOS } from '../../../../paper/stylesIOS';
import { subSecoesStyle } from '../../../menu/pages/style/SubSecoesStyle';

interface IUsuarioAutenticado {
	user?: any;
	navigation: NativeStackNavigationProp<any>;
}

export const UsuarioAutenticado = (props: IUsuarioAutenticado) => {
	const theme = useTheme<{[key:string]: any}>();
    const { user, navigation } = props;
	const { colors } = theme;
	const styles = usuarioAutenticadoStyles(colors);
    const stylesSubSecao = subSecoesStyle(colors);
	const colorScheme = useColorScheme();
    const style = Platform.OS === 'ios' ? styleIOS : null;
	return (
        <View style={{...styles.areaLogin, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
        <Alerta detalhes={
        <Text variant='labelLarge' 
            style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}} numberOfLines={4}> 
                Autenticado pela conta Google. Seus dados são salvos apenas localmente. </Text>
            } />
        <View style={styles.boxInputDados}>
            <Text variant='labelMedium'> Nome</Text>
            <View style={styles.inputDados}>
                <Text variant='bodyLarge' numberOfLines={2}> {user.name}</Text>
            </View>
        </View>
        <View style={styles.boxInputDados}>
            <Text variant='labelMedium'> Email</Text>
            <View style={styles.inputDados}>
                <Text variant='bodyLarge' numberOfLines={2}> {user.email}</Text>
            </View>
        </View>
        </View>

	  	
	);
};
