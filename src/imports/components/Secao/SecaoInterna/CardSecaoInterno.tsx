import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, View} from 'react-native';
import {Card} from 'react-native-paper';
import { cardSecaoInternoStyle } from './CardSecaoInternoStyle';
import { theme } from '../../../paper/theme';

interface ICardSecaoInterno {
    titulo: string;
    descricao?: string;
    rolagem?: boolean;
    onPress?: () => void;
    navigation?: NativeStackNavigationProp<any>;
}

export const CardSecaoInterno = (props: ICardSecaoInterno) => {

    const { navigation, titulo, descricao, onPress, rolagem } = props;

    return (
        <Pressable onPress={onPress} 
            style={({ pressed }) => [pressed ? { opacity: 0.8, backgroundColor: theme.colors.azul } : {},]}
            disabled={rolagem !== undefined ? !rolagem : false}>
            <Card style={cardSecaoInternoStyle.container} mode="contained">
                <View style={cardSecaoInternoStyle.boxPrincipal}>
                    <View style={cardSecaoInternoStyle.boxDescricao}>
                        <Card.Title
                            title={titulo}
                            titleVariant="titleSmall"
                            subtitle={descricao ?? ""}
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
