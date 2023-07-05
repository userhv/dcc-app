import { StatusBar, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../../paper/theme";
import { headerBarStyle } from "./HeaderBarStyle";

interface IHeaderBar {
    titulo: string;
    navigation: NativeStackNavigationProp<any>;
    ativarBusca?: boolean;
    onPressBusca?: () => void;
}

export const HeaderBar = (props: IHeaderBar) => {
    const { titulo, navigation, ativarBusca, onPressBusca } = props;

    return (
        <>
        <StatusBar backgroundColor={theme.colors.branco} barStyle={'dark-content'}/>
        <View style={headerBarStyle.containerTop}>
          <View>
            <IconButton
                icon="arrow-left"
                size={25}
                iconColor={theme.colors.azul}
                onPress={() => navigation?.goBack()}
              />
          </View>
          <View style={headerBarStyle.boxDescricao} accessible={true}>
            <View style={headerBarStyle.titulo}>
              <Text variant="titleLarge" numberOfLines={3} ellipsizeMode="tail"> {titulo}</Text>
            </View>
          {ativarBusca ? (
            <View style={headerBarStyle.icone}>
              <IconButton icon='magnify' size={25} onPress={onPressBusca} style={{marginRight: 10}}/>
            </View>
          ) : null}
          </View>
        </View>
        </>
    )
}