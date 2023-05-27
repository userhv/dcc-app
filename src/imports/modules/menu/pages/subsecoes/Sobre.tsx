import {View} from 'react-native';
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


  return (
    
    <View style={subSecoesStyle.container}>
      <HeaderBar navigation={navigation} titulo='Sobre o aplicativo'/>
        <CardSecaoInterno titulo='Termos de uso' />
        <CardSecaoInterno titulo='Política de privacidade'/>
        <CardSecaoInterno titulo='Versão do aplicativo' descricao={getVersion()}/>

    </View>
  );
};