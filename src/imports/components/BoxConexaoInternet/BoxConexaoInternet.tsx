import { View, useColorScheme } from "react-native"
import { Text, useTheme } from 'react-native-paper';
import { boxConexaoInternetStyle } from "./BoxConexaoInternetStyle";

interface IBoxConexaoInternet {
  temConexao: boolean | null;
}

export const BoxConexaoInternet = (props: IBoxConexaoInternet) => {
  const {temConexao} = props;
  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = boxConexaoInternetStyle(colors);
  const colorScheme = useColorScheme();

    return(
      temConexao !== null  && !temConexao? (
        <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.vermelhoVivoOpacoDark : colors.vermelhoVivoOpaco}}>
            <Text variant='labelLarge' style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}} 
                numberOfLines={3}> Sem conexão com a internet </Text>
        </View>
        ): null

    )
}