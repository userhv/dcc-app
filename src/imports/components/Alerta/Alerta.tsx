import { View, useColorScheme } from "react-native"
import { alertaStyle } from "./AlertaStyle";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";

interface IAlerta {
    detalhes: any;
    icone?: string;
}

export const Alerta = (props: IAlerta) => {
    const {detalhes, icone} = props;
    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = alertaStyle(colors);
    const colorScheme = useColorScheme();

return (
    <View style={{...styles.boxAlerta,  backgroundColor: colorScheme === 'dark' ? colors.vermelhoVivoOpacoDark : colors.vermelhoVivoOpaco}}>
        <View style={styles.iconeAlerta}>
            <Icon name={icone ?? "alert-circle-outline"} size={30} color={colors.vermelhoVivo}/>
        </View>
        <View style={styles.descricao}>
            {detalhes}
        </View>
    </View>
    )
}