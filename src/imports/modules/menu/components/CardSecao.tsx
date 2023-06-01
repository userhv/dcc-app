import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { TouchableHighlight, View} from 'react-native';
import {Card} from 'react-native-paper';
import { cardSecaoStyle } from './style/CardSecaoStyle';
import { theme } from '../../../paper/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ICardSecao {
    titulo: string;
    descricao: string;
    icone: string;
    onPress?: () => void;
    navigation?: NativeStackNavigationProp<any>;
}

export const CardSecao = (props: ICardSecao) => {

    const { navigation, titulo, descricao, icone, onPress } = props;


    return (
        <TouchableHighlight onPress={onPress} underlayColor={theme.colors.cinza98}  activeOpacity={0.8}>
            <Card style={cardSecaoStyle.container} mode="contained" >
                <View style={cardSecaoStyle.boxPrincipal}>
                    <View style={cardSecaoStyle.boxBotao}>
                        <Icon
                            name={icone}
                            color={theme.colors.azul}
                            style={cardSecaoStyle.botoes}
                            size={30}
                            onPress={() => {}}
                            />
                        </View>
                    <View style={cardSecaoStyle.boxDescricao}>
                        <Card.Title
                            title={titulo}
                            titleVariant="titleMedium"
                            titleStyle={cardSecaoStyle.titulo}
                            subtitle={descricao}
                            subtitleStyle={cardSecaoStyle.subtitulo}
                            subtitleVariant="bodyMedium"
                            titleNumberOfLines={2}
                            subtitleNumberOfLines={2}
                        />
                    </View>
                </View>
            </Card>
        </TouchableHighlight>
    );
};
