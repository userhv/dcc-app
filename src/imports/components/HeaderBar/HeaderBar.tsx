import { StatusBar, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../../paper/theme";
import { headerBarStyle } from "./HeaderBarStyle";

interface IHeaderBar {
    titulo: string;
    navigation: NativeStackNavigationProp<any>;
}

export const HeaderBar = (props: IHeaderBar) => {
    const { titulo, navigation } = props;

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
          <View style={headerBarStyle.descricao} accessible={true}>
            <Text variant="headlineSmall"> {titulo}</Text>
          </View>
        </View>
        </>
    )
}