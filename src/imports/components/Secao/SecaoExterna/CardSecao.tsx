import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, View} from 'react-native';
import {Card} from 'react-native-paper';
import { cardSecaoStyle } from './CardSecaoStyle';
import { theme } from '../../../paper/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ICardSecao {
    titulo: string;
    descricao: string;
    icone: string;
    rolagem: boolean;
    onPress?: () => void;
    navigation?: NativeStackNavigationProp<any>;
}

export const CardSecao = (props: ICardSecao) => {

    const { navigation, titulo, descricao, icone, onPress, rolagem } = props;


    return (
        <Pressable onPress={onPress} 
            disabled={!rolagem}
            style={({ pressed }) => [pressed ? { opacity: 0.8, backgroundColor: theme.colors.azul } : {},]}>
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
                            subtitle={descricao}
                            subtitleVariant="bodyMedium"
                            titleNumberOfLines={2}
                            subtitleNumberOfLines={2}
                        />
                    </View>
                </View>
            </Card>
        </Pressable>
    );
};
