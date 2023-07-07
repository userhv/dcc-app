import { View } from "react-native"
import { alertaStyle } from "./AlertaStyle";
import { theme } from "../../paper/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IAlerta {
    detalhes: any;
    icone?: string;
}

export const Alerta = (props: IAlerta) => {
    const {detalhes, icone} = props;

return (
    <View style={alertaStyle.boxAlerta}>
        <View style={alertaStyle.iconeAlerta}>
            <Icon name={icone ?? "alert-circle-outline"} size={30} color={theme.colors.vermelhoVivo}/>
        </View>
        <View style={alertaStyle.descricao}>
            {detalhes}
        </View>
    </View>
    )
}