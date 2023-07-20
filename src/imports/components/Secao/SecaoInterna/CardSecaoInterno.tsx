import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, View, useColorScheme} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import { cardSecaoInternoStyle } from './CardSecaoInternoStyle';

interface ICardSecaoInterno {
    titulo: string;
    descricao?: string;
    rolagem?: boolean;
    onPress?: () => void;
    navigation?: NativeStackNavigationProp<any>;
}

export const CardSecaoInterno = (props: ICardSecaoInterno) => {

    const { navigation, titulo, descricao, onPress, rolagem } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = cardSecaoInternoStyle(colors);

    const colorScheme = useColorScheme();

    return (
        <Pressable onPress={onPress} 
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: colors.accent } : {},]}
            disabled={rolagem !== undefined ? !rolagem : false}>
            <Card style={styles.container} mode="contained">
                <View style={styles.boxPrincipal}>
                    <View style={styles.boxDescricao}>
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
