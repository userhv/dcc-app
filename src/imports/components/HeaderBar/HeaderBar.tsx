import { StatusBar, View, useColorScheme } from "react-native"
import { IconButton, Text, useTheme } from "react-native-paper"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = headerBarStyle(colors);

    const colorScheme = useColorScheme();

    return (
        <>
          <StatusBar backgroundColor={colors.background} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
          <BoxConexaoInternet temConexao={temConexao}/>
          <View style={styles.containerTop}>
            <View>
              <IconButton
                  accessible={true}
                  accessibilityLabel='Toque para voltar a página'
                  accessibilityRole='button' 
                  icon="arrow-left"
                  size={28}
                  iconColor={colors.accent}
                  onPress={() => navigation?.goBack()}
                />
            </View>
            <View style={styles.boxDescricao} accessible={true}>
              <View style={styles.titulo}>
                <Text variant="titleLarge" numberOfLines={3} ellipsizeMode="tail"> {titulo}</Text>
              </View>
            {ativarBusca ? (
              <View style={styles.icone}>
                <IconButton icon='magnify' size={28} onPress={onPressBusca} 
                    style={{marginRight: 10}}
                    iconColor={colors.accent}
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