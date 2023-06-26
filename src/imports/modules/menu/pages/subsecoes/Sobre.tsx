import {Linking, View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardSecaoInterno } from '../../components/CardSecaoInterno';
import { getVersion } from 'react-native-device-info';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';

interface ISobre {
    navigation: NativeStackNavigationProp<any>;
  }

export const Sobre = (props: ISobre) => {

    const { navigation } = props;
    const abrirPlayStore = async () => {
      const url = 'https://play.google.com/store/apps/details?id=com.dcc.android';
      const suportado = await Linking.canOpenURL(url);
      if(suportado) return Linking.openURL(url);
    }

  return (
    <View style={subSecoesStyle.container}>
      <HeaderBar navigation={navigation} titulo='Sobre o aplicativo'/>
        <CardSecaoInterno titulo='Política de privacidade'
                          onPress={() => 	navigation?.navigate('menuRoute', {
                            screen: 'WebViewMenu',
                            params: {url: 'https://dcc.ufmg.br/politica-de-privacidade/'}})}/>
        <CardSecaoInterno titulo='Versão do aplicativo' descricao={getVersion()} 
                          onPress={async () => abrirPlayStore()}/>
    </View>
  );
};