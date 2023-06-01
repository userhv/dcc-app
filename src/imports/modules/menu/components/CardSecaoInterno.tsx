import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableHighlight, View} from 'react-native';
import {Card} from 'react-native-paper';

import { cardSecaoInternoStyle } from './style/CardSecaoInternoStyle';
import { theme } from '../../../paper/theme';

interface ICardSecaoInterno {
    titulo: string;
    descricao?: string;
    onPress?: () => void;
    navigation?: NativeStackNavigationProp<any>;
}

export const CardSecaoInterno = (props: ICardSecaoInterno) => {

    const { navigation, titulo, descricao, onPress } = props;

    return (
        <TouchableHighlight onPress={onPress} underlayColor={theme.colors.cinza98}  activeOpacity={0.8}>
            <Card style={cardSecaoInternoStyle.container} mode="contained">
                <View style={cardSecaoInternoStyle.boxPrincipal}>
                    <View style={cardSecaoInternoStyle.boxDescricao}>
                        <Card.Title
                            title={titulo}
                            titleVariant="titleMedium"
                            titleStyle={cardSecaoInternoStyle.titulo}
                            subtitle={descricao ?? ""}
                            subtitleStyle={cardSecaoInternoStyle.subtitulo}
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
