import { View } from "react-native"
import { Text } from 'react-native-paper';
import { boxConexaoInternetStyle } from "./BoxConexaoInternetStyle";

interface IBoxConexaoInternet {
  temConexao: boolean | null;
}

export const BoxConexaoInternet = (props: IBoxConexaoInternet) => {
  const {temConexao} = props;

    return(
      temConexao !== null  && !temConexao? (
        <View style={boxConexaoInternetStyle.container}>
            <Text variant='labelLarge' style={boxConexaoInternetStyle.texto} numberOfLines={3}> Sem conexão com a internet </Text>
        </View>
        ): null

    )
}