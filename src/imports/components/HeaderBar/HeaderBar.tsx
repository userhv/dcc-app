import { StatusBar, View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../../paper/theme";
import { headerBarStyle } from "./HeaderBarStyle";
import { useContext } from "react";
import { NetInfoContext } from "../../context/NetInfoContext";
import { BoxConexaoInternet } from "../BoxConexaoInternet/BoxConexaoInternet";

interface IHeaderBar {
    titulo: string;
    navigation: NativeStackNavigationProp<any>;
    ativarBusca?: boolean;
    onPressBusca?: () => void;
}

export const HeaderBar = (props: IHeaderBar) => {
    const { titulo, navigation, ativarBusca, onPressBusca } = props;

    const temConexao = useContext(NetInfoContext);

    return (
        <>
          <StatusBar backgroundColor={theme.colors.branco} barStyle={'dark-content'}/>
          <BoxConexaoInternet temConexao={temConexao}/>
          <View style={headerBarStyle.containerTop}>
            <View>
              <IconButton
                  accessible={true}
                  accessibilityLabel='Toque para voltar a página'
                  accessibilityRole='button' 
                  icon="arrow-left"
                  size={28}
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
                <IconButton icon='magnify' size={28} onPress={onPressBusca} 
                    style={{marginRight: 10}}
                    iconColor={theme.colors.azul}
                    accessible={true}
                    accessibilityLabel='Toque para compartilhar o link'
                    accessibilityRole='button' />
              </View>
            ) : null}
            </View>
          </View>
        </>
    )
}