import { View } from "react-native"
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

    return(
      temConexao !== null  && !temConexao? (
        <View style={styles.container}>
            <Text variant='labelLarge' style={styles.texto} numberOfLines={3}> Sem conexão com a internet </Text>
        </View>
        ): null

    )
}