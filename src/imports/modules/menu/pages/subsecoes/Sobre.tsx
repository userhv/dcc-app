import {View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardSecaoInterno } from '../../components/CardSecaoInterno';
import { getVersion } from 'react-native-device-info';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { useContext } from 'react';
import { WebViewRN } from '../../../../components/WebViewRN/WebViewRN';

interface ISobre {
    navigation: NativeStackNavigationProp<any>;
  }

export const Sobre = (props: ISobre) => {

    const { navigation } = props;


    const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

    const abreWebViewPrivacidade = () => {
      showModal({
        isFullScreen: true,
        renderedComponent: (_props: any) => (
          <WebViewRN url={'https://dcc.ufmg.br/politica-de-privacidade/'} handleClose={_props.onDismiss}/>
        )
      });
    }

  return (
    <View style={subSecoesStyle.container}>
      <HeaderBar navigation={navigation} titulo='Sobre o aplicativo'/>
        <CardSecaoInterno titulo='Termos de uso' onPress={() => {}}/>
        <CardSecaoInterno titulo='Política de privacidade'onPress={() => abreWebViewPrivacidade()}/>
        <CardSecaoInterno titulo='Versão do aplicativo' descricao={getVersion()} onPress={() => {}}/>
    </View>
  );
};