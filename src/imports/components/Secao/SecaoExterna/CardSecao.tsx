import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, View, useColorScheme} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import { cardSecaoStyle } from './CardSecaoStyle';
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

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = cardSecaoStyle(colors);

    const colorScheme = useColorScheme();


    return (
        <Pressable onPress={onPress} 
            disabled={!rolagem}
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: colors.accent} : {},]}>
            <Card style={styles.container} mode="contained" >
                <View style={styles.boxPrincipal}>
                    <View style={styles.boxBotao}>
                        <Icon
                            name={icone}
                            color={colors.accent}
                            style={styles.botoes}
                            size={30}
                            onPress={() => {}}
                            />
                        </View>
                    <View style={styles.boxDescricao}>
                        <Card.Title
                            title={titulo}
                            titleVariant="titleMedium"
                            titleStyle={{color: colorScheme === 'dark' ? colors.cinza90 : colors.cinza20}}
                            subtitle={descricao}
                            subtitleVariant="bodyMedium"
                            subtitleStyle={{color: colorScheme === 'dark' ? colors.cinza80 : colors.cinza40}}
                            titleNumberOfLines={2}
                            subtitleNumberOfLines={2}
                        />
                    </View>
                </View>
            </Card>
        </Pressable>
    );
};
